import { CalendarDays } from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import WaitlistForm from '../components/WaitlistForm.jsx';
import { site } from '../config/site.js';
import './pages.css';

/** "Create an account" leads here while accounts are not yet open. */
export default function Waitlist() {
  return (
    <Page>
      <Seo
        title="Join the waitlist"
        description="Register your organisation's interest in JuaMsitu, the environmental intelligence platform for forest monitoring and sustainability insight."
      />
      <PageHero
        compact
        title="Create an account"
        lead="Accounts aren't open yet. Join the waitlist and we'll contact you as JuaMsitu opens to organisations."
      />

      <section className="section">
        <div className="container form-wrap">
          <div className="form-aside">
            <h2>Tell us about your work</h2>
            <p>
              Your answers help us understand what organisations need from forest and environmental
              monitoring, and who to invite first.
            </p>
            <p>Prefer to talk it through?</p>
            <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
              <CalendarDays aria-hidden="true" /> Book a call
            </a>
          </div>
          <WaitlistForm />
        </div>
      </section>
    </Page>
  );
}
