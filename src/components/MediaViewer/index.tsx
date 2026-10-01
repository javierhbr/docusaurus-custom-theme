import React, {useEffect, useId, useRef, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';

/** Native modal supplies focus trapping, Escape dismissal, and focus restoration. */
export default function MediaViewer({title, children, onClose}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}): ReactNode {
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const modal = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  return createPortal(
    <dialog ref={dialog} className="theme-media-viewer" aria-labelledby={titleId}
      onClose={onClose} onClick={(event) => {if (event.target === event.currentTarget) onClose();}}>
      <div className="theme-media-viewer__shell">
        <header className="theme-media-viewer__toolbar">
          <span id={titleId} className="theme-media-viewer__title">{title}</span>
          <div className="theme-media-viewer__controls" role="group" aria-label="Zoom controls">
            <button type="button" aria-label="Zoom out" disabled={scale <= 1} onClick={() => setScale((value) => Math.max(1, value - 0.25))}>−</button>
            <output aria-live="polite">{Math.round(scale * 100)}%</output>
            <button type="button" aria-label="Zoom in" disabled={scale >= 3} onClick={() => setScale((value) => Math.min(3, value + 0.25))}>+</button>
            <button type="button" onClick={() => {setScale(1); viewport.current?.scrollTo(0, 0);}}>Reset</button>
            <button type="button" aria-label="Close viewer" onClick={onClose}>Close <span aria-hidden="true">×</span></button>
          </div>
        </header>
        <div ref={viewport} className="theme-media-viewer__viewport" tabIndex={0} aria-label="Media; scroll to explore when zoomed">
          <div className="theme-media-viewer__content" style={{width: `${scale * 100}%`, height: `${scale * 100}%`}}>
            {children}
          </div>
        </div>
      </div>
    </dialog>, document.body,
  );
}
