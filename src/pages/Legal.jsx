import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import { site } from '../config/site.js';
import './pages.css';

/*
 * IMPORTANT: these are starting drafts, not legal advice.
 * Have them reviewed (for example against Kenya's Data Protection Act, 2019)
 * before relying on them.
 */

const DraftNote = () => (
  <p className="notice notice--warn draft-note">
    This page is a draft and will be updated. Questions? Email {site.email}.
  </p>
);

export function Privacy() {
  return (
    <Page>
      <Seo title="Privacy policy" description="How JuaMsitu collects and uses personal information." />
      <PageHero compact title="Privacy policy" />
      <section className="section">
        <div className="container prose legal">
          <DraftNote />
          <h2>What we collect</h2>
          <p>
            When you join the waitlist we collect the details you enter: your name, work email,
            organisation, role, organisation type, area of interest and your description of what you'd
            like to achieve. We don't collect payment details. Donations are handled entirely by M-Pesa.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your details to manage the waitlist, contact you about JuaMsitu and understand what
            organisations need from the platform. We don't sell or share your information with third
            parties for marketing.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us to see, correct or delete your information at any time by emailing {site.email}.
          </p>
          <h2>Third-party services</h2>
          <p>
            This site loads fonts from Google Fonts and images from Unsplash, and booking links open Google
            Calendar. These services may process technical data such as your IP address under their own policies.
          </p>
        </div>
      </section>
    </Page>
  );
}

export function Terms() {
  return (
    <Page>
      <Seo title="Terms of use" description="Terms for using the JuaMsitu website." />
      <PageHero compact title="Terms of use" />
      <section className="section">
        <div className="container prose legal">
          <DraftNote />
          <h2>Using this website</h2>
          <p>
            This website introduces JuaMsitu and its work. You may browse and share it for personal and
            non-commercial purposes.
          </p>
          <h2>Platform previews</h2>
          <p>
            Previews of the JuaMsitu platform use illustrative sample data. They are not live or verified
            measurements and shouldn't be relied on for decisions.
          </p>
          <h2>Donations</h2>
          <p>
            Donations are made through M-Pesa and are subject to Safaricom's terms. Please check the till
            number before confirming any payment.
          </p>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent to {site.email}.</p>
        </div>
      </section>
    </Page>
  );
}
