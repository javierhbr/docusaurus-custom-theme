# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

For colors, fonts, layout, and component styling, see the
[UI theme customization guide](docs/how-to/customize-theme.md).

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Search and Markdown export

The navbar uses `@easyops-cn/docusaurus-search-local` to search documentation,
blog posts, and pages. Press **⌘K** on macOS or **Ctrl+K** on Windows/Linux to
focus search. Results include page paths and link to matching content.

Search indexes are generated during production builds, so use the production
preview when testing search (the development server does not build the index):

```bash
npm run preview
```

The preview runs at http://127.0.0.1:3001. Stop an existing preview on that port
before starting another one.

`docusaurus-plugin-copy-page-button` adds **Copy page** above article content,
with **Copy as Markdown** and **View as Markdown** actions. Exported content
keeps headings, lists, links, tables, and code while excluding navigation controls.
Production builds also emit Markdown files alongside pages, for example
`/index.md` and `/api-reference/use-callback.md`.

Both plugins are configured in `docusaurus.config.ts`. The copy button is rendered
by `src/theme/DocItem/Content/index.tsx`, which refreshes its content on page
navigation. Page export styles use the existing light/dark theme tokens in
`src/css/custom.css`.

## How To and the HTML Library

**How To** has its own navbar tab and documentation sidebar at `/how-to`.
Existing tutorial URLs are preserved; their sidebar follows the tutorial folders.

## Directory-driven sidebars

Add a `.md` or `.mdx` file to `docs/` and it appears in Reference automatically.
Nested folders become collapsible groups. Files in `docs/how-to/`,
`docs/tutorial-basics/`, and `docs/tutorial-extras/` appear only in How To.
Adding, moving, or deleting documents updates navigation during development;
rebuild the site to publish those changes.

Use frontmatter `sidebar_position` to order a page, `sidebar_label` to rename its
navigation label, and `sidebar_custom_props` for badges. Add `_category_.json`
inside a folder to set its label and position. An `index.md`, `index.mdx`, or
`README.md` becomes that folder's landing page. No per-page sidebar list is needed.

### Static HTML discovery

Put standalone `.html` or `.htm` documents in `static/html/` (subfolders work).
At configuration load, `scripts/sync-static-html.cjs` generates the library and
text versions under `docs/how-to/generated/`. Those generated files are ignored
by Git and should not be edited. Docusaurus includes them in normal site search,
sidebar navigation, and Markdown export. The original HTML stays available under
`/html/`, with its layout, relative assets, and interactions intact.

Use a descriptive `<title>` and `<meta name="description">` in each HTML file.
Documents marked `noindex` are excluded from discovery, but remain public static
files. The included publishing checklist demonstrates the complete path.

Run `npm run preview` to regenerate the library and search index, or restart
`npm start` after changing HTML files during development. Deleting a source file
also removes its generated reading page on the next configuration load.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
