---
title: Customize the UI theme
description: Change the site's colors, fonts, layout, navigation spacing, and component styles.
sidebar_position: 2
---

This guide describes the theme in this repository. Most visual changes belong in
`src/css/custom.css`. Edit its existing rules so the same setting is not scattered
across several overrides. The examples below are optional changes, not settings
already applied to the site.

## Find the right file

All paths below are relative to the project root.

| Change | File or setting |
| --- | --- |
| Colors, fonts, spacing, borders, responsive layout | `src/css/custom.css` |
| Site name, navigation links, logo path, footer, default color mode | `docusaurus.config.ts` |
| Logo artwork | `static/img/logo.svg` |
| Header structure and community icon | `src/theme/Navbar/Content/index.tsx` |
| “On this page” heading and outline structure | `src/theme/TOC/index.tsx` |
| Sidebar badge markup | `src/theme/DocSidebarItem/Link/index.tsx` |
| Sidebar expansion reset after navigation | `src/theme/DocSidebarItems/index.tsx` |
| Copy-page labels and actions | `src/theme/DocItem/Content/index.tsx` |
| Sidebar section roots | `sidebars.ts` |
| Individual page labels, order, and badges | Document frontmatter |
| Folder labels and order | The folder's `_category_.json` |

The Classic preset already loads `./src/css/custom.css` through its
`theme.customCss` setting. Do not edit `node_modules`, `build`, or `.docusaurus`:
those files are dependencies or generated output.

## Change colors

The `:root` block defines the light palette. The `[data-theme='dark']` block
overrides it for dark mode. Edit both when changing the brand.

| CSS variable | Purpose |
| --- | --- |
| `--theme-color-brand-50`, `--theme-color-brand-100` | Selected backgrounds and text selection |
| `--theme-color-brand-200` through `--theme-color-brand-800` | Brand shades for borders, links, focus, and hover states |
| `--theme-color-bg` | Main page background |
| `--theme-color-bg-soft` | Sidebar and footer background |
| `--theme-color-surface`, `--theme-color-surface-2`, `--theme-color-surface-3` | Controls, code surfaces, and hover backgrounds |
| `--theme-color-text` | Body text |
| `--theme-color-text-strong` | Headings and emphasized text |
| `--theme-color-text-muted`, `--theme-color-text-faint` | Secondary text |
| `--theme-color-border`, `--theme-color-border-strong` | Dividers and control outlines |
| `--theme-color-danger` | Accent used by inline code keywords |

For example, these edits change the light reading surfaces to warmer neutrals:

```css
:root {
  --theme-color-bg: #fffefa;
  --theme-color-bg-soft: #f7f5f0;
  --theme-color-surface: #fffefa;
  --theme-color-surface-2: #f4f1eb;
  --theme-color-surface-3: #ebe7df;
  --theme-color-border: #e4dfd5;
  --theme-color-border-strong: #c9c1b4;
  --theme-color-text: #514c44;
  --theme-color-text-strong: #28251f;
  --theme-color-text-muted: #70685b;
}
```

For a different accent color, update the entire `--theme-color-brand-*` scale,
not just one shade. `--ifm-color-primary` already points to brand-600, but the
`--ifm-color-primary-dark*` and `--ifm-color-primary-light*` variables contain
literal colors and need matching updates. These control Docusaurus components.

Also review `--docusaurus-highlighted-code-line-bg` and the dark-mode
`--search-local-highlight-color`: they currently contain literal violet values.
Keep text readable on selected, hovered, and focused backgrounds in both modes.

## Change fonts and text sizes

The first line of `custom.css` imports IBM Plex Sans and IBM Plex Mono.
The body and headings use IBM Plex Sans; code uses IBM Plex Mono.

To use system fonts, remove that Google Fonts import and update these variables:

```css
:root {
  --theme-font-body: system-ui, -apple-system, 'Segoe UI', sans-serif;
  --theme-font-heading: var(--theme-font-body);
  --ifm-font-family-monospace: ui-monospace, 'SFMono-Regular', Consolas, monospace;
}
```

To use another web font, load the font with an import or `@font-face`, then use
its exact family name in those variables. Keep `@import` declarations at the
top of the stylesheet. Load the weights the design uses: 400, 500, 600, and 700.

Use these existing settings to adjust typography:

| Setting | Current value or location |
| --- | --- |
| Base text size | `--ifm-font-size-base: 100%` |
| Body line height | `--ifm-line-height-base: 1.75` |
| Heading line height | `--ifm-heading-line-height: 1.25` |
| Page title | `.theme-doc-markdown h1`, using `clamp(2rem, 3.5vw, 2.7rem)` |
| Section headings | `.theme-doc-markdown h2` and `h3` |
| Intro paragraph | `.theme-doc-markdown > p:first-of-type` |
| Sidebar text | `.theme-doc-sidebar-container .menu` |
| Page outline text | `.table-of-contents__link` |
| Code blocks | `pre` |

There are additional title and intro size overrides in the `max-width: 576px`
media query. Check those when changing desktop typography.

## Adjust page and panel widths

The shell currently uses the full page width with `--theme-shell-max: 100%`.
The article grows to fill the space between the left sidebar and right outline.
Its internal padding is separate from the overall shell width.

| Region | Current desktop width | Smaller desktop width, 997–1199px |
| --- | --- | --- |
| Left documentation sidebar | `--doc-sidebar-width: 272px` | `244px` |
| Right “On this page” panel | `240px` | `190px` |
| Gap between article and outline | `32px` | `24px` |

### Widen “On this page”

Edit the `.col.col--3` rule inside the existing `min-width: 997px` media query.
Change **both** the flex basis and maximum width. For example:

```css
@media (min-width: 997px) {
  .theme-doc-sidebar-container + main > .container > .row > .col.col--3 {
    flex: 0 0 280px;
    max-width: 280px;
    padding: 0;
  }
}
```

The later `997px–1199px` rule overrides this width on smaller desktops. Edit its
`flex-basis` and `max-width` together if those screens also need more space.
Keep that narrower rule after the general desktop rule. A wider outline leaves
less room for the article, so inspect tables and code blocks after changing it.

`.theme-doc-aside` controls the outline's inner padding, left border, sticky
offset, and scrollable height. Changing only that element's width will not
correctly allocate space in the surrounding layout.

### Adjust article padding

Look for the selector ending in
`.container.padding-top--md.padding-bottom--lg`. Its desktop padding is
`36px clamp(28px, 3vw, 56px) 56px`: top, horizontal, and bottom.
Separate mobile rules use smaller padding. Keep the article's `min-width: 0`
so wide content can scroll inside its own container.

## Adjust sidebar spacing and labels

The sidebar uses these compact spacing settings:

```css
.menu__list-item:not(:first-child) { margin-top: 2px; }
.menu__link { min-height: 34px; padding: 6px 10px; }
.sidebar-shell-overview { margin-bottom: 20px; }
.sidebar-shell-group + .sidebar-shell-group {
  margin-top: 20px;
  padding-top: 12px;
}
.sidebar-shell-group > .menu__list { margin-top: 6px; }
```

Change vertical padding for row density and group margins for separation between
sections. These snippets show only the spacing properties; preserve the other
properties in the existing rules. Mobile navigation keeps a `44px` minimum link
height in `.navbar-sidebar .menu__link` for touch interaction.

The sidebar follows the documentation directory tree. To change a page's label,
order, or badge, edit its frontmatter rather than maintaining a page list:

```yaml
---
title: Configure your workspace
sidebar_label: Workspace setup
sidebar_position: 3
sidebar_custom_props:
  badge: New
  badgeTone: new
---
```

The badge renderer supports `new`, `muted`, and `subtle` tones. `subtle` uses the
base badge styling. Folder presentation belongs in `_category_.json`, for example:

```json
{
  "label": "Workspace guides",
  "position": 3,
  "collapsed": true
}
```

## Change corners, borders, and component styles

`--ifm-global-radius` affects components that use the shared Docusaurus radius.
The `--theme-radius-*` variables are declared, but many custom rules currently
use literal values such as `6px` or `8px`. Changing those variables alone will
not change every corner. Edit the relevant `border-radius` declarations, or
replace them with a shared variable before adjusting that variable globally.

| Component | CSS selector or variable |
| --- | --- |
| Header links | `.theme-nav__right .navbar__link` |
| Search input | `.navbar__search-input` |
| Search results | `--search-local-*` variables |
| Copy-page button and menu | `.theme-copy-page__button`, `.theme-copy-page__dropdown`, `.theme-copy-page__item` |
| Sidebar badges | `.theme-sidebar-badge` and its tone classes |
| Page outline links | `.table-of-contents__link` |
| Inline code and code blocks | `.theme-doc-markdown :where(...) code`, `.theme-code-block`, `pre` |
| Tables | `.theme-doc-markdown table`, `th`, and `td` |
| Previous/next links | `.pagination-nav__link` |
| Footer | `.footer` and `.theme-footer__*` |

Code syntax palettes are configured separately in `docusaurus.config.ts` under
`themeConfig.prism`: the site currently uses `prismThemes.github` for light mode
and `prismThemes.dracula` for dark mode.

## Change branding and default appearance

In `docusaurus.config.ts`, edit:

- `title` and `tagline` for site identity.
- `themeConfig.navbar.title` and `themeConfig.navbar.logo` for the header brand.
- `customFields.navVersion` for the header version badge.
- `themeConfig.navbar.items` for navigation labels and destinations.
- `themeConfig.footer` for footer links and its custom brand markup.
- `themeConfig.colorMode` for the initial color mode and switch behavior.

The current color settings are `defaultMode: 'light'`, `disableSwitch: false`,
and `respectPrefersColorScheme: false`. A visitor's saved theme choice can take
precedence over the initial default.

Changing the navigation structure itself belongs in
`src/theme/Navbar/Content/index.tsx`. For a visual adjustment, start with its
`.theme-nav__*` CSS rules instead. The community bell link is in that component.

## Preview and verify

1. Start development with `npm start`. CSS and document edits normally refresh
   automatically; restart after configuration changes if needed.
2. Check light and dark modes, long sidebar labels, active links, keyboard focus,
   code blocks, and wide tables.
3. Check a wide desktop, a 1024px-wide desktop, and a narrow phone viewport.
   The site switches to mobile navigation at `996px` and has extra compact
   adjustments at `576px`.
4. Run `npm run build`. If you changed TypeScript configuration or components,
   also run `npm run typecheck`.
5. Use `npm run preview` to build and serve the production site at
   `http://127.0.0.1:3001`. Stop any existing preview using that port first.
   Production builds are required to verify the local search index.

If a change is missing, check whether a later media query or dark-mode rule
overrides it. The production preview needs a rebuild to reflect source changes.
Use the stable selectors in this stylesheet instead of generated class names
containing build-specific hashes.

The shared Docusaurus behavior is documented in the official
[styling guide](https://docusaurus.io/docs/3.9.2/styling-layout) and
[theme configuration reference](https://docusaurus.io/docs/3.9.2/api/themes/configuration).
