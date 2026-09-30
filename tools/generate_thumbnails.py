"""Create thumbnails, then compress and replace originals (lossy for JPEG/WebP).

Targets 5 MB at 24 megapixels, scaled by pixel count and capped at 10 MB.
Keeps originals already below their target and preserves animated/multi-frame files.
"""

import argparse
from io import BytesIO
import math
import os
from pathlib import Path
import sys
import tempfile

try:
    from PIL import Image, ImageOps
except ImportError:
    raise SystemExit("Pillow is required. Install it with: python -m pip install Pillow")


EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff", ".gif"}
MB = 1_000_000


def encode(image, format_name, quality=85, icc_profile=None):
    options = {}
    if format_name == "JPEG":
        image = image.convert("RGB")
        options = {"quality": quality, "optimize": True, "progressive": True}
    elif format_name == "WEBP":
        options = {"quality": quality, "method": 6}
    elif format_name == "PNG":
        options = {"optimize": True}
    elif format_name == "TIFF":
        options = {"compression": "tiff_deflate"}
    if icc_profile and format_name in {"JPEG", "PNG", "WEBP", "TIFF"}:
        options["icc_profile"] = icc_profile
    buffer = BytesIO()
    image.save(buffer, format=format_name, **options)
    return buffer.getvalue()


def compress_original(path, image, format_name, icc_profile):
    # A 24 MP photo targets 5 MB; smaller photos get less, with a 10 MB ceiling.
    target_bytes = int(min(10 * MB, max(MB, 5 * MB * image.width * image.height / 24_000_000)))
    original_bytes = path.stat().st_size
    if original_bytes <= target_bytes:
        return False

    working = image
    while True:
        if format_name in {"JPEG", "WEBP"}:
            data = encode(working, format_name, 95, icc_profile)
            if len(data) > target_bytes:
                low, high = 70, 94
                best = None
                while low <= high:
                    quality = (low + high) // 2
                    candidate = encode(working, format_name, quality, icc_profile)
                    if len(candidate) <= target_bytes:
                        best = candidate
                        low = quality + 1
                    else:
                        high = quality - 1
                data = best if best is not None else encode(working, format_name, 70, icc_profile)
        else:
            data = encode(working, format_name, icc_profile=icc_profile)
        if len(data) <= target_bytes:
            break
        if working.size == (1, 1):
            raise ValueError("Cannot meet the size limit; original was kept.")
        scale = min(0.9, math.sqrt(target_bytes / len(data)) * 0.95)
        size = (max(1, int(working.width * scale)), max(1, int(working.height * scale)))
        working = working.resize(size, Image.Resampling.LANCZOS)

    # Validate first, then replace atomically after all file handles are closed.
    with Image.open(BytesIO(data)) as check:
        check.verify()
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(dir=path.parent, prefix=".compress-", suffix=".tmp", delete=False) as temp:
            temp_path = Path(temp.name)
            temp.write(data)
        os.replace(temp_path, path)
    finally:
        if temp_path is not None and temp_path.exists():
            temp_path.unlink()
    print(f"Compressed: {path.name}: {original_bytes / MB:.2f} -> {len(data) / MB:.2f} MB "
          f"({working.width}x{working.height}, target {target_bytes / MB:.2f} MB)")
    return True


def positive_int(value):
    number = int(value)
    if number < 1:
        raise argparse.ArgumentTypeError("Must be a positive integer.")
    return number


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folder", type=Path, help="Directory containing the images.")
    parser.add_argument("--size", type=positive_int, default=800,
                        help="Maximum width and height in pixels (default: 800).")
    parser.add_argument("--quality", type=int, choices=range(1, 96), metavar="1-95",
                        default=82, help="JPEG/WebP quality (default: 82).")
    parser.add_argument("--recursive", action="store_true", help="Include subdirectories.")
    parser.add_argument("--overwrite", action="store_true", help="Replace existing thumbnails.")
    parser.add_argument("--thumbnails-only", action="store_true",
                        help="Create thumbnails without replacing originals.")
    args = parser.parse_args()
    folder = args.folder.expanduser().resolve()
    if not folder.is_dir():
        parser.error(f"Directory does not exist: {folder}")

    files = sorted(folder.rglob("*") if args.recursive else folder.iterdir())
    created = skipped = compressed = failed = 0
    for path in files:
        if not path.is_file() or path.suffix.lower() not in EXTENSIONS:
            continue
        if path.stem.lower().endswith("-small"):
            skipped += 1
            continue
        target = path.with_name(f"{path.stem}-small{path.suffix}")
        try:
            with Image.open(path) as source:
                image = ImageOps.exif_transpose(source)
                image.load()
                format_name = source.format
                icc_profile = source.info.get("icc_profile")
                multi_frame = getattr(source, "n_frames", 1) > 1
                if target.exists() and not args.overwrite:
                    skipped += 1
                else:
                    thumbnail = image.copy()
                    thumbnail.thumbnail((args.size, args.size), Image.Resampling.LANCZOS)
                    target.write_bytes(encode(thumbnail, format_name, args.quality, icc_profile))
                    created += 1
                    print(f"Created: {target}")
            if not args.thumbnails_only:
                if multi_frame:
                    print(f"Original kept (animation/multiple frames): {path}")
                elif compress_original(path, image, format_name, icc_profile):
                    compressed += 1
        except (OSError, ValueError, Image.DecompressionBombError) as error:
            failed += 1
            print(f"Failed: {path}: {error}", file=sys.stderr)
    print(f"Done: {created} thumbnails created, {skipped} skipped, "
          f"{compressed} originals compressed, {failed} failed.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
