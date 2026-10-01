import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import OriginalImage from '@theme-original/MDXComponents/Img';
import type {Props} from '@theme/MDXComponents/Img';

export default function ZoomableImage(props: Props): ReactNode {
  const wrapper = useRef<HTMLSpanElement>(null);
  const [canZoom, setCanZoom] = useState(false);
  useEffect(() => {
    // Preserve linked images, decorative images, and explicitly opted-out images.
    setCanZoom(Boolean(props.alt) && !props.className?.split(/\s+/).includes('no-zoom') && !wrapper.current?.closest('a, button'));
  }, [props.alt, props.className]);

  return (
    <span ref={wrapper}>
      <OriginalImage {...props}
        tabIndex={canZoom ? 0 : props.tabIndex}
        role={canZoom ? 'button' : props.role}
        aria-label={canZoom ? `Zoom image: ${props.alt}` : props['aria-label']}
        onKeyDown={(event) => {
          props.onKeyDown?.(event);
          if (canZoom && !event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            // The plugin owns zoom behavior; keyboard activation uses the same click.
            event.currentTarget.click();
          }
        }} />
    </span>
  );
}
