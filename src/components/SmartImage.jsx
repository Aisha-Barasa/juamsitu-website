import { useState } from 'react';

/**
 * Image with lazy loading and a forest-coloured fallback,
 * so a failed download never shows a broken image icon.
 */
export default function SmartImage({ src, alt, className = '', eager = false, style }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`img-fallback ${className}`} role="img" aria-label={alt} style={style} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
