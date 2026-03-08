import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';

type SidebarBadgeTone = 'muted' | 'new' | 'subtle';

type SidebarCustomProps = {
  badge?: string;
  badgeTone?: SidebarBadgeTone;
};

function LinkLabel({label}: {label: string}) {
  return (
    <span title={label} className="theme-sidebar-link__label">
      {label}
    </span>
  );
}

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const {href, label, className, autoAddBaseUrl} = item;
  const badgeConfig = (item.customProps ?? {}) as SidebarCustomProps;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={`${label}-${index}`}>
      <Link
        className={clsx('menu__link', 'theme-sidebar-link', {
          'menu__link--active': isActive,
        })}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <span className="theme-sidebar-link__content">
          <LinkLabel label={label} />
          {badgeConfig.badge && (
            <span
              className={clsx(
                'theme-sidebar-badge',
                badgeConfig.badgeTone && `theme-sidebar-badge--${badgeConfig.badgeTone}`,
              )}>
              {badgeConfig.badge}
            </span>
          )}
        </span>
        {!isInternalLink && (
          <span className="theme-sidebar-link__external">
            <IconExternalLink />
          </span>
        )}
      </Link>
    </li>
  );
}
