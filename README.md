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

## Blogs、昼夜主题与 Site Footprint

本次扩展保持纯静态 HTML，无需 npm/Jekyll 构建。

- `assets/base.css`：从原主页提取的基础样式。
- `assets/site.css`：参考页面的近白／深海军蓝配色、48px 网格及照片墙样式。
- `assets/theme.js`：系统／白天／夜间切换，保存至浏览器本地。
- `blogs/index.html`：按月份展示照片，点击放大，支持左右方向键、Esc 关闭。
- `assets/site-config.js`：照片清单和访客地图配置。

### 添加自己的照片

将图片放在 `assets/blogs/`，在 `assets/site-config.js` 的 `photos` 数组中添加：

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

`thumbnail` 可省略。路径相对于站点根目录，月份格式为 `YYYY-MM`，页面自动按月份倒序分组。未添加照片时显示空状态，不会将参考作者的照片冒充自己的经历。引用他人授权照片可补充 `credit` 和 `source`。

### 创建自己的 MapMyVisitors 地图

1. 打开 https://mapmyvisitors.com/，点击 **Create Your Free Widget**，按页面提示注册／登录。
2. 添加你的实际 GitHub Pages 网址，选择 **Map Counter**，取得 HTML 嵌入代码。
3. 从代码中的 `map.png?...&d=...` 或 `map.js?...&d=...` 提取 `d` 参数（到下一个 `&` 为止），填入 `visitorMapId`。不要把 `/web/` 后面的短编号填在这里。
4. 将自己的访客统计页面地址 `https://mapmyvisitors.com/web/你的编号` 填入 `visitorMapUrl`。
5. 保存并部署网页。主页和 Blogs 页会显示同一张地图，点击进入你的访客统计页。图片不能加载时会保留统计页面链接。

示例（以下仅为占位符，需替换）：

```js
visitorMapId: '从嵌入代码复制的d参数',
visitorMapUrl: 'https://mapmyvisitors.com/web/你的编号',
```

未配置时页面显示地图尚未连接，不会发送请求给参考作者的统计服务。访客地图通过第三方图片请求记录访问，需要联网，且可能被广告拦截器屏蔽。

本地预览：在仓库目录运行 `python3 -m http.server 8000`，访问 http://localhost:8000/ 和 http://localhost:8000/blogs/ 。
