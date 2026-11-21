import { CalendarDays, Mail } from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import { site } from '../config/site.js';
import './pages.css';

export default function Contact() {
  return (
    <Page>
      <Seo title="Contact" description="Book a call with the JuaMsitu team or email juamsitu@gmail.com." />
      <PageHero compact title="Talk to JuaMsitu" lead="Book a time that suits you, or send us an email." />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-card">
            <CalendarDays aria-hidden="true" />
            <h2>Book a call</h2>
            <p>Pick a slot in our calendar. It opens Google Calendar in a new tab.</p>
            <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--teal">Book a call</a>
          </div>
          <div className="contact-card">
            <Mail aria-hidden="true" />
            <h2>Email us</h2>
            <p>For partnerships, organisations, media or general questions.</p>
            <a href={`mailto:${site.email}`} className="btn btn--ghost">{site.email}</a>
          </div>
        </div>
      </section>
    </Page>
  );
}
