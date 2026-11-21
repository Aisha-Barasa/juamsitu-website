import SmartImage from './SmartImage.jsx';
import Graticule from './Graticule.jsx';

/**
 * Hero band used at the top of inner pages.
 * Pass an image for a photographic hero, or leave it out for a plain
 * deep-canopy band (used on short pages such as legal and contact).
 */
export default function PageHero({ title, lead, image, children, compact = false }) {
  return (
    <section className={`page-hero ${compact ? 'page-hero--compact' : ''} ${image ? 'page-hero--image' : ''}`}>
      {image && (
        <div className="page-hero__media">
          <SmartImage src={image.src} alt={image.alt} className="page-hero__img" eager />
        </div>
      )}
      <div className="page-hero__overlay" />
      <Graticule />
      <div className="container page-hero__content">
        <h1>{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
