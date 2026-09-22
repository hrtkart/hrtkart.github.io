# Minimal Academic Homepage

A minimal, responsive academic homepage template for GitHub Pages.

This template is designed for students, researchers, and early-career academics who want to build a clean personal academic homepage with only one `index.html` file.

## Preview

Live demo:

    https://xin-jiaqi.github.io/minimal-academic-homepage/

This demo shows the default template layout, including profile, selected publications, projects, education & experience, awards, and posts & notes.

## Screenshots

Desktop and mobile overview:

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/24e5f4dd-4439-4314-b1d8-47ba7906f1a9" />

Selected publications:

<img width="900" height="852" alt="image" src="https://github.com/user-attachments/assets/f05a7a36-3b6c-459d-a47b-6d8a690169b7" />


Projects, education, and awards:

<img width="896" height="678" alt="image" src="https://github.com/user-attachments/assets/c1d0f990-ad52-4545-9f6f-96165f047c7b" />

Posts and notes:

<img width="898" height="567" alt="image" src="https://github.com/user-attachments/assets/99698708-0f8c-4fae-84e0-4f813c73e4da" />

## Features

- Single-file HTML/CSS template
- Responsive layout for desktop and mobile
- Clean Apple-style visual design
- Sections for:
  - Personal profile
  - Selected publications
  - Projects
  - Education & experience
  - Selected awards
  - Posts & notes
- Easy deployment with GitHub Pages
- No framework, no build tools, no extra dependencies

## File Structure

    minimal-academic-homepage/
    ├── index.html
    └── assets/
        ├── profile.jpg
        ├── pub-1.jpg
        ├── pub-2.jpg
        ├── pub-3.jpg
        ├── pub-4.jpg
        ├── university-logo-1.png
        ├── university-logo-2.png
        ├── university-logo-3.png
        ├── demo-overview.jpg
        ├── demo-publications.jpg
        ├── demo-projects-experience.jpg
        └── demo-posts-notes.jpg

## How to Use

### 1. Fork or use this template

Click **Use this template** or fork this repository to your own GitHub account.

### 2. Edit `index.html`

Open `index.html` and replace the placeholder content:

- `Your Name`
- `Your Position or Degree Program`
- `Your Department, Your University`
- Email, GitHub, Google Scholar, ORCID, ResearchGate links
- Publication titles, authors, DOI, journal links, and highlights
- Projects
- Education & experience
- Awards
- Posts & notes

### 3. Replace images

Replace the files in the `assets/` folder with your own images.

Recommended image names:

    assets/profile.jpg
    assets/pub-1.jpg
    assets/pub-2.jpg
    assets/pub-3.jpg
    assets/pub-4.jpg
    assets/university-logo-1.png
    assets/university-logo-2.png
    assets/university-logo-3.png

You can keep the same file names to avoid editing image paths in `index.html`.

The demo screenshots used in this README are:

    assets/demo-overview.jpg
    assets/demo-publications.jpg
    assets/demo-projects-experience.jpg
    assets/demo-posts-notes.jpg

You can replace them with your own screenshots, or remove the `Screenshots` section if you do not need it.

### 4. Enable GitHub Pages

Go to:

    Settings → Pages → Build and deployment

Choose:

    Source: Deploy from a branch
    Branch: main
    Folder: /root

Save the settings. After a short wait, your homepage will be online.

For a project repository, the page URL usually looks like:

    https://your-username.github.io/minimal-academic-homepage/

For a user homepage repository named `your-username.github.io`, the page URL usually looks like:

    https://your-username.github.io/

## Customization

You can customize colors and spacing in the CSS variables near the top of `index.html`.

For example, edit:

    :root {
      --bg: #f5f5f7;
      --card: rgba(255, 255, 255, 0.94);
      --text: #1d1d1f;
      --link: #0066cc;
    }

You can also remove any section you do not need, such as `Selected Awards` or `Posts & Notes`.

## Tips

- Keep the homepage concise. A personal academic homepage should help readers quickly understand who you are, what you work on, and where to find your work.
- Use publication highlights to summarize the main contribution of each paper in one sentence.
- Use `Projects` for GitHub repositories, research tools, scripts, datasets, or tutorials.
- Use `Posts & Notes` to organize blog posts, research notes, tutorials, or reading notes.
- Keep image file names unchanged if you do not want to edit the HTML paths.

## Notes

This template is intentionally simple. It does not use Jekyll, React, Vue, or any build system. Everything is contained in `index.html`, making it easy to understand, edit, and deploy.

## License

You may use, modify, and adapt this template for your personal academic homepage.

## Blogs, Light/Dark Themes, and Site Footprint

These additions use plain static HTML and require no npm or Jekyll build.

- `assets/base.css`: Base styles extracted from the original homepage.
- `assets/site.css`: Off-white and deep navy colors, a 48px background grid, and photo gallery styles inspired by the reference site.
- `assets/theme.js`: Switches between system, light, and dark themes and saves the preference locally in the browser.
- `blogs/index.html`: Displays photos by month. Click to enlarge, use the left/right arrow keys to navigate, and press Esc to close.
- `assets/site-config.js`: Configures the photo list and visitor map.

### Add Your Own Photos

Place images in `assets/blogs/` and add entries to the `photos` array in `assets/site-config.js`:

```js
{
  month: '2026-09',
  title: 'Hong Kong',
  src: 'assets/blogs/hong-kong.jpg',
  thumbnail: 'assets/blogs/hong-kong-small.jpg',
  caption: 'An evening walk.',
  alt: 'Victoria Harbour at sunset'
}
```

`thumbnail` is optional. Paths are relative to the site root, and months use the `YYYY-MM` format. Photos are automatically grouped by month, newest first. An empty state appears until photos are added; the reference author's photos are not presented as your own experiences. For licensed photos by others, add `credit` and `source` fields.

### Create Your Own MapMyVisitors Map

1. Open https://mapmyvisitors.com/, click **Create Your Free Widget**, and follow the instructions to sign up or log in.
2. Add your actual GitHub Pages URL, select **Map Counter**, and obtain the HTML embed code.
3. Extract the `d` parameter from `map.png?...&d=...` or `map.js?...&d=...` in the code, stopping at the next `&`, and paste it into `visitorMapId`. Do not use the short ID after `/web/` here.
4. Set `visitorMapUrl` to your visitor statistics page URL: `https://mapmyvisitors.com/web/your-id`.
5. Save and deploy the site. The homepage and Blogs page will display the same map, which links to your visitor statistics page. If the image fails to load, a link to the statistics page remains available.

Example (replace these placeholders with your own values):

```js
visitorMapId: 'd-parameter-copied-from-your-embed-code',
visitorMapUrl: 'https://mapmyvisitors.com/web/your-id',
```

Without configuration, the page indicates that the map is not connected and sends no requests to the reference author's analytics service. The visitor map records visits through third-party image requests, requires an internet connection, and may be blocked by ad blockers.

Local preview: Run `python3 -m http.server 8000` in the repository directory, then visit http://localhost:8000/ and http://localhost:8000/blogs/.
