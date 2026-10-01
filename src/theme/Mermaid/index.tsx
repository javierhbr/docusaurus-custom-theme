import React, {useState, type ReactNode} from 'react';
import Mermaid from '@theme-original/Mermaid';
import type {Props} from '@theme/Mermaid';
import MediaViewer from '@site/src/components/MediaViewer';

export default function Diagram(props: Props): ReactNode {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="theme-diagram" aria-label="Mermaid diagram">
      <div className="theme-diagram__toolbar" data-no-copy="true">
        <span>Diagram</span>
        <button type="button" aria-label="Expand diagram" onClick={() => setExpanded(true)}>Expand <span aria-hidden="true">↗</span></button>
      </div>
      <div className="theme-diagram__canvas"><Mermaid {...props} /></div>
      {expanded && <MediaViewer title="Diagram" onClose={() => setExpanded(false)}><Mermaid {...props} /></MediaViewer>}
    </section>
  );
}
