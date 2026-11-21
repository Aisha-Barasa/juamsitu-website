import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import SmartImage from '../components/SmartImage.jsx';
import Graticule from '../components/Graticule.jsx';
import { useInViewOnce, usePrefersReducedMotion } from '../hooks/motion.js';
import { site, images } from '../config/site.js';
import './pages.css';

/*
 * Why JuaMsitu exists: each point has a short lead phrase (new, drawn from
 * its sentence) followed by the original sentence, unchanged.
 */
const reasons = [
  {
    lead: 'Information is hard to access or interpret',
    text: 'Environmental information can be difficult to access and interpret.',
  },
  {
    lead: 'Monitoring needs consistent insight',
    text: 'Forest monitoring needs consistent and accessible insights.',
  },
  {
    lead: 'Decisions need reliable evidence',
    text: 'Restoration and conservation decisions benefit from reliable evidence.',
  },
  {
    lead: 'Progress must be communicated clearly',
    text: 'Organisations need stronger ways to understand and communicate environmental progress.',
  },
];

/** Vertical timeline whose line draws in as the visitor scrolls. */
function ReasonsTimeline() {
  const listRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [revealRef, inView] = useInViewOnce(0.15);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 55%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={revealRef} className={inView ? 'is-in' : ''}>
      <ol className="timeline" ref={listRef}>
        {/* Track and the line that draws over it (transform: scaleY only) */}
        <span className="timeline__track" aria-hidden="true" />
        <motion.span
          className="timeline__line"
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : lineScale }}
        />
        {reasons.map((r, i) => (
          <li className="timeline__item rv" key={r.lead} style={{ '--d': `${i * 120}ms` }}>
            <span className="timeline__dot" aria-hidden="true" />
            <h3 className="timeline__lead">{r.lead}</h3>
            <p className="timeline__text">{r.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function About() {
  const [whyHeadRef, whyHeadIn] = useInViewOnce(0.25);
  const [missionRef, missionIn] = useInViewOnce(0.25);

  return (
    <Page>
      <Seo
        title="About JuaMsitu"
        description="JuaMsitu exists to make environmental intelligence more accessible and useful, supporting better decisions for forests, ecosystems and the communities that depend on them."
      />

      {/* Hero: headline fades up, then the paragraph */}
      <PageHero
        image={images.hero}
        animated
        emphasis
        title="A future where every forest can be understood, valued and protected."
        lead="JuaMsitu means 'know the forest' in Swahili. It's an environmental intelligence platform that connects data, people and action."
      />

      {/* Why JuaMsitu exists: editorial timeline */}
      <section className="section">
        <div className="container why-exists">
          <div className={`why-exists__head ${whyHeadIn ? 'is-in' : ''}`} ref={whyHeadRef}>
            <h2 className="rv">Why JuaMsitu exists</h2>
            <span className="accent-line rv--line why-exists__accent" style={{ '--d': '120ms' }} aria-hidden="true" />
            <p className="why-exists__intro rv" style={{ '--d': '240ms' }}>
              Forests are more than landscapes. They are living systems that need to be understood,
              monitored and protected. Today, that is harder than it should be.
            </p>
          </div>
          <ReasonsTimeline />
        </div>
      </section>

      {/* Mission and vision */}
      <section className="section section--dark">
        <div className={`container statements ${missionIn ? 'is-in' : ''}`} ref={missionRef}>
          <div className="statement rv">
            <p className="statement__label">Our mission</p>
            <p className="statement__text">
              To make environmental intelligence more accessible and useful, supporting better decisions for
              forests, ecosystems and the communities that depend on them.
            </p>
          </div>
          <span className="statements__divider" aria-hidden="true" />
          <div className="statement rv" style={{ '--d': '150ms' }}>
            <p className="statement__label">Our vision</p>
            <p className="statement__text">
              A future where environmental data empowers people and institutions to protect the natural
              systems that sustain us.
            </p>
          </div>
        </div>
      </section>

      {/* What we are */}
      <section className="section">
        <div className="container split">
          <figure className="survey-frame">
            <SmartImage src={images.aerial.src} alt={images.aerial.alt} className="survey-frame__img" />
            <Graticule dense />
            <span className="survey-frame__corner survey-frame__corner--tl" />
            <span className="survey-frame__corner survey-frame__corner--br" />
          </figure>
          <div>
            <h2>Data, people and action</h2>
            <p className="lead">
              JuaMsitu is not a tree-planting organisation, and it isn't technology for its own sake.
            </p>
            <p className="prose">
              We combine geospatial insights, forest monitoring and data-driven decision-making so that
              communities, restoration partners, institutions and businesses can see how forests are
              changing and act on what they learn.
            </p>
            <Link to="/#approach" className="btn btn--ghost">See our approach</Link>
          </div>
        </div>
      </section>

      {/* Follows another light section, so it skips its own top padding */}
      <section className="section section--continue">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Protect our forests. Preserve our future.</h2>
              <p>Talk to us about how JuaMsitu can support your work, or help a restoration project today.</p>
            </div>
            <div className="btn-row">
              <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--teal">
                <CalendarDays aria-hidden="true" /> Book a call
              </a>
              <Link to="/donate" className="btn btn--ghost">Donate</Link>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
