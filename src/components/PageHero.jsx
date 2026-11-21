import SmartImage from './SmartImage.jsx';
import Graticule from './Graticule.jsx';
import { useMountedReveal } from '../hooks/motion.js';

/**
 * Hero band used at the top of inner pages.
 * Pass an image for a photographic hero, or leave it out for a plain
 * deep-canopy band (used on short pages such as legal and contact).
 *
 * Opt-in options (pages that don't pass them are unchanged):
 *   animated  fade-up on load: headline, then lead, then children (buttons),
 *             staggered by `stagger` ms
 *   emphasis  larger, slightly heavier lead paragraph and a stronger
 *             left-side green overlay for WCAG AA contrast over the photo
 */
export default function PageHero({
  title,
  lead,
  image,
  children,
  compact = false,
  animated = false,
  emphasis = false,
  stagger = 150,
}) {
  const ready = useMountedReveal();
  const rv = animated ? 'rv' : '';

  return (
    <section
      className={[
        'page-hero',
        compact && 'page-hero--compact',
        image && 'page-hero--image',
        emphasis && 'page-hero--emphasis',
        animated && ready && 'is-in',
      ].filter(Boolean).join(' ')}
    >
      {image && (
        <div className="page-hero__media">
          <SmartImage src={image.src} alt={image.alt} className="page-hero__img" eager />
        </div>
      )}
      <div className="page-hero__overlay" />
      <Graticule />
      <div className="container page-hero__content">
        <h1 className={rv}>{title}</h1>
        {lead && (
          <p className={`page-hero__lead ${rv}`} style={{ '--d': `${stagger}ms` }}>
            {lead}
          </p>
        )}
        {children && (
          <div className={rv} style={{ '--d': `${stagger * 2}ms` }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
