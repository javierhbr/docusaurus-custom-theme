import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  ErrorCauseBoundary,
  ThemeClassNames,
  useThemeConfig,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import SearchBar from '@theme/SearchBar';

function NotificationIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4.75a4.5 4.5 0 0 0-4.5 4.5v1.22c0 .75-.27 1.47-.76 2.04L5.5 13.97v1.03h13v-1.03l-1.24-1.46a3.15 3.15 0 0 1-.76-2.04V9.25A4.5 4.5 0 0 0 12 4.75Zm0 14.5a2.33 2.33 0 0 1-2.15-1.42h4.3A2.33 2.33 0 0 1 12 19.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, index) => (
        <ErrorCauseBoundary
          key={index}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.\n${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const {siteConfig} = useDocusaurusContext();
  const navVersion =
    typeof siteConfig.customFields?.navVersion === 'string'
      ? siteConfig.customFields.navVersion
      : undefined;

  return (
    <div className="navbar__inner theme-nav__inner">
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerLeft,
          'navbar__items theme-nav__left',
        )}>
        {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
        <div className="theme-nav__brand">
          <NavbarLogo />
          {navVersion && <span className="theme-nav__version">{navVersion}</span>}
        </div>
        <div className="theme-nav__left-items">
          <NavbarItems items={leftItems} />
        </div>
      </div>

      <div className="theme-nav__center">
        <SearchBar />
      </div>

      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerRight,
          'navbar__items navbar__items--right theme-nav__right',
        )}>
        <NavbarItems items={rightItems} />
        <NavbarColorModeToggle className="theme-nav__icon-button theme-nav__color-toggle" />
        <a
          className="theme-nav__icon-link"
          href="/community"
          aria-label="Open community updates">
          <NotificationIcon />
        </a>
      </div>
    </div>
  );
}
