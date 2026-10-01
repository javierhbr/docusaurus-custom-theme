import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const require = createRequire(import.meta.url);
const {version: packageVersion} = require('./package.json') as {version: string};
// Generate searchable docs before the docs and local-search plugins load.
const {syncStaticHtml} = require('./scripts/sync-static-html.cjs');
syncStaticHtml(fileURLToPath(new URL('.', import.meta.url)));

const config: Config = {
  title: 'slothui',
  tagline: 'Reference-first Docusaurus theme with a polished docs shell.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://example.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  customFields: {
    navVersion: 'v18.3.2',
    packageVersion,
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            // Keep How To's directories out of the root Reference tree.
            const howToRoots = ['how-to', 'tutorial-basics', 'tutorial-extras'];
            const docs = args.item.dirName === '.'
              ? args.docs.filter((doc) => !howToRoots.some((root) =>
                  doc.sourceDirName === root || doc.sourceDirName.startsWith(`${root}/`)))
              : args.docs;
            return defaultSidebarItemsGenerator({...args, docs});
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        injectButton: false,
        generateMarkdownRoutes: true,
      },
    ],
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/',
        blogRouteBasePath: '/blog',
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: 'left',
        ignoreCssSelectors: [
          'aside',
          '.theme-doc-sidebar-container',
          '.theme-doc-aside',
          '.navbar',
          '.footer',
          '#copy-page-button-container',
          '[data-copy-page-button-container]',
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'slothui',
      logo: {
        alt: 'slothui logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: 'Learn',
          position: 'right',
          activeBaseRegex: '^/$|^/intro/?$',
        },
        {
          type: 'docSidebar',
          sidebarId: 'howToSidebar',
          label: 'How To',
          position: 'right',
        },
        {
          to: '/api-reference/use-callback',
          label: 'Reference',
          position: 'right',
          activeBaseRegex: '^/(api-reference|state-patterns|callback-patterns)',
        },
        {to: '/blog', label: 'Blog', position: 'right'},
        {to: '/community', label: 'Community', position: 'right'},
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: false,
      },
    },
    footer: {
      links: [
        {label: 'Docs', to: '/'},
        {label: 'How To', to: '/how-to'},
        {label: 'Reference', to: '/api-reference/use-callback'},
        {label: 'Community', to: '/community'},
        {label: 'Blog', to: '/blog'},
        {label: 'Slack Channel', href: 'https://slothui.slack.com'},
        {label: 'support@slothui.dev', href: 'mailto:support@slothui.dev'},
      ],
      copyright: `<div class="theme-footer__meta"><span class="theme-footer__brand">slothui</span><span class="theme-footer__divider"></span><span class="theme-footer__label">Package</span><span class="theme-footer__version">v${packageVersion}</span><span class="theme-footer__divider"></span><span class="theme-footer__label">${new Date().getFullYear()}</span></div>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
