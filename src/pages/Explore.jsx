import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, UserPlus } from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { site, images, capabilities, statusLabels } from '../config/site.js';
import './pages.css';

/**
 * /explore: the platform's coming soon page.
 * The app is an early prototype and not yet public, so this page sets
 * honest expectations and offers clear next steps.
 */
export default function Explore() {
  return (
    <Page>
      <Seo
        title="Explore the platform"
        description="The JuaMsitu environmental intelligence platform is in early prototype. Join the waitlist or book a call to hear when it opens."
      />

      <section className="explore">
        <div className="container explore__inner">
          <motion.div
            className="explore__visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="explore__orbit" aria-hidden="true" />
            <div className="explore__globe">
              <SmartImage src={images.comingSoon.src} alt={images.comingSoon.alt} eager />
            </div>
          </motion.div>

          <div>
            <span className="explore__status"><i aria-hidden="true" /> Early prototype in progress</span>
            <h1>The JuaMsitu platform is on its way.</h1>
            <p className="explore__lead">
              We're refining an early prototype that brings forest health indicators, geospatial layers and
              environmental context together in one place. It isn't open to the public yet, and we'd rather
              open it when it's genuinely useful.
            </p>

            <ul className="roadmap" aria-label="Platform capabilities and their status">
              {capabilities.map((c) => (
                <li key={c.id}>
                  <span>{c.title}</span>
                  <span className={`status status--${c.status}`}>{statusLabels[c.status]}</span>
                </li>
              ))}
            </ul>

            <div className="btn-row">
              <Link to="/organisations/waitlist" className="btn btn--sun">
                <UserPlus aria-hidden="true" /> Join the waitlist
              </Link>
              <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--ghost-light">
                <CalendarDays aria-hidden="true" /> Book a call
              </a>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.92rem' }}>
              <Link to="/#preview" className="explore__link">See the platform preview</Link>
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}
