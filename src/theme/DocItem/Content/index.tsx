import React, {type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import DocItemContent from '@theme-original/DocItem/Content';
import type {Props} from '@theme/DocItem/Content';
import CopyPageButton from 'docusaurus-plugin-copy-page-button/react';

export default function DocItemContentWithPageActions(props: Props): ReactNode {
  const {pathname} = useLocation();

  return (
    <>
      <div className="theme-page-actions">
        <CopyPageButton
          // Refresh the extracted content when client-side navigation changes pages.
          key={pathname}
          generateMarkdownRoutes
          enabledActions={['copy', 'view']}
          labels={{
            button: {label: 'Copy page'},
            copy: {title: 'Copy as Markdown', description: 'Copy this page to your clipboard'},
            view: {title: 'View as Markdown', description: 'Open a plain-text version in a new tab'},
          }}
          customStyles={{
            button: {className: 'theme-copy-page__button'},
            dropdown: {className: 'theme-copy-page__dropdown'},
            dropdownItem: {className: 'theme-copy-page__item'},
          }}
        />
      </div>
      <DocItemContent {...props} />
    </>
  );
}
