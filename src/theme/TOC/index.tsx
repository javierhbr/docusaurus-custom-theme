import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import type {Props} from '@theme/TOC';

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, ...props}: Props): ReactNode {
  return (
    <aside className={clsx('theme-doc-aside', className)}>
      <div className="theme-doc-aside__card">
        <div className="theme-doc-aside__title">On This Page</div>
        <div className="theme-doc-aside__toc">
          <TOCItems
            {...props}
            linkClassName={LINK_CLASS_NAME}
            linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
          />
        </div>
      </div>
    </aside>
  );
}
