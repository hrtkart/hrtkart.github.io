(() => {
  const root = document.querySelector('#photo-journal');
  if (!root) return;
  const siteRoot = new URL('../', document.baseURI);
  function safeURL(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try { const url = new URL(value, siteRoot); return ['http:', 'https:'].includes(url.protocol) ? url.href : null; } catch (_) { return null; }
  }
  const photos = (Array.isArray(window.SITE_CONFIG?.photos) ? window.SITE_CONFIG.photos : [])
    .filter(p => p && /^\d{4}-(0[1-9]|1[0-2])$/.test(p.month) && safeURL(p.src))
    .sort((a,b) => b.month.localeCompare(a.month) || Number(b.featured === true) - Number(a.featured === true));
  if (!photos.length) return;
  const dialog = document.querySelector('.lightbox');
  const image = document.querySelector('#lightbox-image');
  const caption = document.querySelector('#lightbox-caption');
  const count = document.querySelector('#photo-count');
  const previous = dialog.querySelector('[data-previous]');
  const next = dialog.querySelector('[data-next]');
  let current = 0;
  function show(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    image.src = safeURL(photo.src);
    image.alt = photo.alt || photo.title || 'Journal photograph';
    caption.textContent = photo.caption || photo.title || '';
    if (photo.credit) {
      const credit = document.createElement(safeURL(photo.source) ? 'a' : 'span');
      credit.textContent = ` — ${photo.credit}`;
      if (credit.tagName === 'A') { credit.href = safeURL(photo.source); credit.target = '_blank'; credit.rel = 'noopener noreferrer'; }
      caption.append(credit);
    }
    count.textContent = `${current + 1} / ${photos.length}`;
    previous.disabled = next.disabled = photos.length < 2;
  }
  const groups = new Map();
  photos.forEach((p, index) => {
    if (!groups.has(p.month)) groups.set(p.month, []);
    groups.get(p.month).push({ photo:p, index });
  });
  root.replaceChildren();
  groups.forEach((items, month) => {
    const section = document.createElement('section'); section.className = 'month-group';
    const header = document.createElement('div'); header.className = 'month-heading';
    const title = document.createElement('h2');
    title.textContent = new Date(`${month}-01T12:00:00Z`).toLocaleDateString('en-US', { month:'short', year:'numeric', timeZone:'UTC' });
    const total = document.createElement('span'); total.className = 'photo-total'; total.textContent = `${items.length} ${items.length === 1 ? 'photo' : 'photos'}`;
    header.append(title,total);
    const grid = document.createElement('div'); grid.className = 'photo-grid';
    items.forEach(({photo,index}) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'photo-tile';
      if (photo.featured === true) {
        button.classList.add('photo-tile-featured');
      }
      button.setAttribute('aria-label', `Open image: ${photo.title || photo.alt || 'Photo ' + (index + 1)}`);
      const thumbnail = document.createElement('img'); thumbnail.src = safeURL(photo.thumbnail) || safeURL(photo.src);
      thumbnail.alt = photo.alt || photo.title || 'Journal photograph'; thumbnail.loading = 'lazy'; thumbnail.decoding = 'async';
      const label = document.createElement('span'); label.textContent = photo.title || photo.alt || 'View photo';
      button.append(thumbnail,label);
      button.addEventListener('click', () => { show(index); dialog.showModal(); });
      grid.append(button);
    });
    section.append(header,grid); root.append(section);
  });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => show(current - 1)); next.addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(current + (event.key === 'ArrowLeft' ? -1 : 1)); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }});
})();
