import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import SupportExplorer from '../components/SupportExplorer.jsx';
import { useInViewOnce } from '../hooks/motion.js';
import { site, images } from '../config/site.js';
import './pages.css';

/*
 * For organisations
 * Structure comes from typography, hairlines, spacing and background
 * shifts (no icons, no boxed cards). Background rhythm:
 *   hero (photo) · intro (white) · ESG (pale green) · explorer (dark green)
 *   · audiences (deeper green) · closing band (pale green)
 */

const esg = [
  {
    letter: 'E',
    title: 'Environmental',
    text: 'How an organisation affects the natural environment, including forests, biodiversity, land use, climate and natural resources.',
  },
  {
    letter: 'S',
    title: 'Social',
    text: 'How its activities affect people, communities, livelihoods and stakeholders.',
  },
  {
    letter: 'G',
    title: 'Governance',
    text: 'How it manages responsibility, accountability, transparency and ethical decision-making.',
  },
];

const audiences = [
  'Corporates and ESG teams',
  'NGOs and conservation organisations',
  'Forest and restoration partners',
  'County governments and public institutions',
  'Development partners and sustainability programmes',
  'Researchers and environmental practitioners',
];

export default function Organisations() {
  const [introRef, introIn] = useInViewOnce(0.3);
  const [esgRef, esgIn] = useInViewOnce(0.2);
  const [audRef, audIn] = useInViewOnce(0.2);
  const [ctaRef, ctaIn] = useInViewOnce(0.3);

  return (
    <Page>
      <Seo
        title="For organisations"
        description="JuaMsitu helps companies, NGOs, county governments and development partners connect environmental data with sustainability decisions, monitoring and ESG reporting."
      />

      {/* 1. Hero: headline, paragraph, then buttons, ~150 ms apart */}
      <PageHero
        image={images.aerial}
        animated
        emphasis
        title="Turn environmental responsibility into measurable insight."
        lead="Sustainability commitments matter. But meaningful progress requires reliable environmental information, consistent monitoring and evidence that supports transparent reporting."
      >
        <div className="btn-row">
          <Link to="/organisations/waitlist" className="btn btn--sun">Create an account</Link>
          <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--ghost-light">
            Book a call
          </a>
        </div>
      </PageHero>

      {/* 2. Intro: large pull statement */}
      <section className="section org-pull">
        <div className={`container ${introIn ? 'is-in' : ''}`} ref={introRef}>
          <span className="accent-line rv--line org-pull__accent" aria-hidden="true" />
          <p className="org-pull__text rv" style={{ '--d': '120ms' }}>
            JuaMsitu aims to help organisations connect environmental data with the decisions, actions
            and reporting that shape a more sustainable future.
          </p>
        </div>
      </section>

      {/* 3. ESG: three open columns, then an editorial block */}
      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <h2>Understanding ESG and sustainability</h2>
            <p className="lead">
              ESG is a way of looking at an organisation's wider impact. It covers three areas.
            </p>
          </div>

          <dl className={`esg-cols ${esgIn ? 'is-in' : ''}`} ref={esgRef}>
            {esg.map((e, i) => (
              <div className="esg-col rv" key={e.letter} style={{ '--d': `${i * 120}ms` }}>
                <span className="esg-col__letter" aria-hidden="true">{e.letter}</span>
                <dt className="esg-col__label">{e.title}</dt>
                <dd className="esg-col__text">{e.text}</dd>
              </div>
            ))}
          </dl>

          <div className="monitor">
            <h3 className="monitor__title">Why environmental monitoring matters</h3>
            <div className="monitor__body">
              <p>
                <span className="monitor__lead">
                  Responsible business depends on knowing what is actually happening on the ground.
                </span>{' '}
                A sustainability strategy is only as strong as the information behind it, and environmental
                conditions such as forest cover and vegetation health can change from season to season.
              </p>
              <p>
                Consistent monitoring helps organisations set realistic goals, see whether their actions
                are working and explain progress to boards, investors, regulators and communities. As
                expectations around ESG disclosure grow, evidence that can be traced back to observable
                conditions becomes more valuable than broad claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tabbed explorer (accordion on mobile) */}
      <section className="section section--dark sx-section">
        <div className="container">
          <div className="section-head">
            <h2>How JuaMsitu supports organisations</h2>
            <p className="lead">
              The platform is being developed in stages. Choose an area to see the question it is designed
              to help you answer, then talk to us about where it fits your work today.
            </p>
          </div>
          <SupportExplorer />
        </div>
      </section>

      {/* 5. Audiences: two-column list of large lines */}
      <section className="section aud">
        <div className="container">
          <h2 className="aud__title">Who can work with JuaMsitu?</h2>
          <ul className={`aud__list ${audIn ? 'is-in' : ''}`} ref={audRef}>
            {audiences.map((a, i) => (
              <li className="aud__item rv" key={a} style={{ '--d': `${i * 80}ms` }}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Closing call to action: full-width pale green band */}
      <section className="section section--mist org-cta">
        <div className={`container ${ctaIn ? 'is-in' : ''}`} ref={ctaRef}>
          <h2 className="org-cta__title rv">Let's make environmental impact more visible.</h2>
          <p className="org-cta__text rv" style={{ '--d': '120ms' }}>
            Whether you are strengthening your sustainability strategy, supporting restoration or
            looking for better ways to understand environmental change, let's explore how JuaMsitu
            can support your work.
          </p>
          <div className="btn-row rv" style={{ '--d': '240ms' }}>
            <Link to="/organisations/waitlist" className="btn btn--sun">Create an account</Link>
            <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Book a call
            </a>
          </div>
        </div>
      </section>
    </Page>
  );
}
