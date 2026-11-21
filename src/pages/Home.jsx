import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Satellite, ScanSearch, Sprout, CalendarDays, Info } from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import Graticule from '../components/Graticule.jsx';
import DashboardPreview from '../components/DashboardPreview.jsx';
import HeroVideo from '../components/HeroVideo.jsx';
import SurveyCard from '../components/SurveyCard.jsx';
import { useInViewOnce } from '../hooks/motion.js';
import { site, images } from '../config/site.js';
import './pages.css';

const steps = [
  { icon: Satellite, title: 'Observe', text: 'Access relevant environmental and geospatial information.' },
  { icon: ScanSearch, title: 'Understand', text: 'Interpret forest conditions and identify patterns or changes.' },
  { icon: Sprout, title: 'Act', text: 'Use evidence to inform restoration, conservation and sustainability decisions.' },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  // Gentle parallax: the photo drifts slower than the page
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  // Hero video: paused state (stops zoom and grid drift too) and the
  // container its pause button is rendered into
  const [heroPaused, setHeroPaused] = useState(false);
  const [controlsEl, setControlsEl] = useState(null);

  // "Understanding forests" section reveals once, at ~25% visible
  const [whyTextRef, whyTextIn] = useInViewOnce(0.25);
  const [whyCardRef, whyCardIn] = useInViewOnce(0.25);

  return (
    <Page>
      <Seo
        title="Know your forest. Protect your future."
        description="JuaMsitu brings environmental data and geospatial intelligence together to help people and organisations understand forest health and monitor ecosystem change in Kenya."
      />

      {/* ---------------- Hero ---------------- */}
      <section className={`hero ${heroPaused ? 'hero--paused' : ''}`} ref={heroRef}>
        {/* Background: photo first, looping video layered on when appropriate */}
        <motion.div className="hero__media" style={{ y: imageY }}>
          <HeroVideo
            poster={images.hero.src}
            alt={images.hero.alt}
            sources={images.heroVideo}
            onPausedChange={setHeroPaused}
            controlsEl={controlsEl}
          />
        </motion.div>
        <div className="hero__overlay" />

        {/* Geospatial data layer above the video, drifting very slowly */}
        <div className="hero__grid" aria-hidden="true">
          <Graticule />
        </div>

        <div className="container hero__content">
          <h1 className="hero__title">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Know Your Forest.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Protect Your Future.
            </motion.span>
          </h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Forests are constantly changing. JuaMsitu brings environmental data and geospatial
            intelligence together to help us understand forest health, monitor ecosystem changes and
            make better decisions for a sustainable future.
          </motion.p>
          <motion.div
            className="btn-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/explore" className="btn btn--sun">Explore platform</Link>
            <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--ghost-light">
              <CalendarDays aria-hidden="true" /> Book a call
            </a>
          </motion.div>
        </div>

        <p className="hero__caption">{images.hero.caption}, 0.28° N 34.86° E</p>

        {/* Pause/play button for the background video is rendered here */}
        <div className="hero__controls" ref={setControlsEl} />

        <a href="#why" className="hero__scroll" aria-label="Scroll to learn more">
          <span className="hero__scroll-line" />
        </a>
      </section>

      {/* ---------------- Why JuaMsitu ---------------- */}
      <section className="section" id="why">
        <div className="container split">
          {/* Heading, accent line, then paragraphs: staggered ~120 ms */}
          <div className={`split__text ${whyTextIn ? 'is-in' : ''}`} ref={whyTextRef}>
            <h2 className="rv">Understanding forests is the first step towards protecting them.</h2>
            <span className="accent-line rv--line why-accent" style={{ '--d': '120ms' }} aria-hidden="true" />
            <p className="lead rv" style={{ '--d': '240ms' }}>
              Forests play an essential role in biodiversity, climate regulation, water security and
              community livelihoods. Yet understanding how they are changing requires more than observation.
            </p>
            <p className="prose rv" style={{ '--d': '360ms' }}>
              JuaMsitu is designed to make environmental information more accessible, bringing together
              geospatial data and forest-monitoring insights to support informed decisions.
            </p>
          </div>

          <div ref={whyCardRef}>
            <SurveyCard
              image={images.aerial}
              inView={whyCardIn}
              caption="Canopy seen from above. Every tree tells part of the story."
            />
          </div>
        </div>
      </section>

      {/* ---------------- Our approach ---------------- */}
      {/* Follows another light section, so it skips its own top padding */}
      <section className="section section--continue" id="approach">
        <div className="container">
          <div className="section-head">
            <h2>Our approach</h2>
            <p className="lead">Three steps that turn information about a forest into decisions that help it.</p>
          </div>

          <ol className="steps">
            {steps.map((s, i) => (
              <li className="step" key={s.title}>
                <div className="step__marker">
                  <span className="step__icon"><s.icon aria-hidden="true" /></span>
                  <span className="step__num">{i + 1}</span>
                </div>
                <h3 className="step__title">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Platform preview ---------------- */}
      <section className="section section--dark preview" id="preview">
        <div className="container">
          <div className="preview__head">
            <div>
              <h2>A clearer picture of our forests.</h2>
              <p className="lead">
                Explore the potential of geospatial intelligence to make forest information more
                accessible, understandable and actionable. Select a forest or toggle the vegetation layer.
              </p>
            </div>
            <Link to="/explore" className="btn btn--sun">Explore JuaMsitu</Link>
          </div>

          <DashboardPreview />

          <p className="preview__note">
            <Info aria-hidden="true" />
            This is a promotional preview. Values, scores and the vegetation layer are illustrative
            sample data, not live or verified measurements.
          </p>
        </div>
      </section>

      {/* ---------------- Paths ---------------- */}
      <section className="section">
        <div className="container paths">
          <Link to="/organisations" className="path path--teal">
            <h3>For organisations</h3>
            <p>See how environmental insight can support your sustainability strategy and ESG reporting.</p>
            <span className="path__link">Work with JuaMsitu</span>
          </Link>
          <Link to="/donate" className="path path--sun">
            <h3>Support restoration</h3>
            <p>Contribute through M-Pesa to a restoration project run by one of our restoration partners.</p>
            <span className="path__link">Donate</span>
          </Link>
        </div>
      </section>
    </Page>
  );
}
