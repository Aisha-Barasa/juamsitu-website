import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Leaf, Layers, Compass, ShieldCheck, Satellite, ScanSearch, Sprout,
  CalendarDays, Building2, Heart, Info,
} from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import SmartImage from '../components/SmartImage.jsx';
import Graticule from '../components/Graticule.jsx';
import DashboardPreview from '../components/DashboardPreview.jsx';
import { site, images, capabilities, statusLabels } from '../config/site.js';
import './pages.css';

const icons = { Leaf, Layers, Compass, ShieldCheck };

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

  return (
    <Page>
      <Seo
        title="Know your forest. Protect your future."
        description="JuaMsitu brings environmental data and geospatial intelligence together to help people and organisations understand forest health and monitor ecosystem change in Kenya."
      />

      {/* ---------------- Hero ---------------- */}
      <section className="hero" ref={heroRef}>
        <motion.div
          className="hero__media"
          style={{ y: imageY }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <SmartImage src={images.hero.src} alt={images.hero.alt} className="hero__img" eager />
        </motion.div>
        <div className="hero__overlay" />
        <Graticule />

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
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              Protect Your Future.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <p className="hero__lead">
              Forests are constantly changing. JuaMsitu brings environmental data and geospatial
              intelligence together to help us understand forest health, monitor ecosystem changes
              and make better decisions for a sustainable future.
            </p>
            <div className="btn-row">
              <Link to="/explore" className="btn btn--sun">Explore platform</Link>
              <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--ghost-light">
                <CalendarDays aria-hidden="true" /> Book a call
              </a>
            </div>
          </motion.div>
        </div>

        <p className="hero__caption">{images.hero.caption}, 0.28° N 34.86° E</p>

        <a href="#why" className="hero__scroll" aria-label="Scroll to learn more">
          <span className="hero__scroll-line" />
        </a>
      </section>

      {/* ---------------- Why JuaMsitu ---------------- */}
      <section className="section" id="why">
        <div className="container split">
          <div className="split__text">
            <h2>Understanding forests is the first step towards protecting them.</h2>
            <p className="lead">
              Forests play an essential role in biodiversity, climate regulation, water security and
              community livelihoods. Yet understanding how they are changing requires more than observation.
            </p>
            <p className="prose">
              JuaMsitu is designed to make environmental information more accessible, bringing together
              geospatial data and forest-monitoring insights to support informed decisions.
            </p>
          </div>

          <figure className="survey-frame">
            <SmartImage src={images.aerial.src} alt={images.aerial.alt} className="survey-frame__img" />
            <Graticule dense />
            <span className="survey-frame__corner survey-frame__corner--tl" />
            <span className="survey-frame__corner survey-frame__corner--br" />
            <figcaption className="survey-frame__caption">Canopy seen from above. Every tree tells part of the story.</figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------- What JuaMsitu does ---------------- */}
      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <h2>From environmental data to meaningful action.</h2>
            <p className="lead">
              JuaMsitu is being built in stages. Each capability shows where it stands today.
            </p>
          </div>

          <div className="capabilities">
            {capabilities.map((c) => {
              const Icon = icons[c.icon] ?? Leaf;
              return (
                <article className="capability" key={c.id}>
                  <div className="capability__top">
                    <span className="capability__num">{c.id}</span>
                    <span className={`status status--${c.status}`}>{statusLabels[c.status]}</span>
                  </div>
                  <Icon className="capability__icon" aria-hidden="true" />
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Our approach ---------------- */}
      <section className="section" id="approach">
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
            <Building2 aria-hidden="true" />
            <h3>For organisations</h3>
            <p>See how environmental insight can support your sustainability strategy and ESG reporting.</p>
            <span className="path__link">Work with JuaMsitu</span>
          </Link>
          <Link to="/donate" className="path path--sun">
            <Heart aria-hidden="true" />
            <h3>Support restoration</h3>
            <p>Contribute through M-Pesa to a restoration project run by one of our restoration partners.</p>
            <span className="path__link">Donate</span>
          </Link>
        </div>
      </section>
    </Page>
  );
}
