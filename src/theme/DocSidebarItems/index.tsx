import React, {type ReactNode} from 'react';
import DocSidebarItems from '@theme-original/DocSidebarItems';
import type {Props} from '@theme/DocSidebarItems';

export default function RouteAwareSidebarItems(props: Props): ReactNode {
  // Reset category expansion on document navigation, including search and history.
  // Docusaurus initializes the active ancestor chain open and other branches closed.
  // Manual expansion still works until the reader navigates to another document.
  return <DocSidebarItems key={props.activePath} {...props} />;
}
