import { Link } from 'react-router-dom';
import {
  Radar, Map, Sprout, FileBarChart, Briefcase, HeartHandshake, Trees,
  Landmark, Globe2, Microscope, CalendarDays, UserPlus,
} from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import { site, images } from '../config/site.js';
import './pages.css';

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

const support = [
  { icon: Radar, title: 'Environmental monitoring', text: 'Support the monitoring of forest landscapes and environmental conditions.' },
  { icon: Map, title: 'Geospatial insights', text: 'Use spatial information to understand environmental conditions and changes across locations.' },
  { icon: Sprout, title: 'Restoration visibility', text: 'Help organisations and restoration partners track and communicate environmental restoration activities.' },
  { icon: FileBarChart, title: 'ESG and sustainability reporting support', text: 'Provide relevant environmental insights that can contribute to sustainability disclosures, monitoring frameworks and evidence-based reporting.' },
];

const audiences = [
  { icon: Briefcase, label: 'Corporates and ESG teams' },
  { icon: HeartHandshake, label: 'NGOs and conservation organisations' },
  { icon: Trees, label: 'Forest and restoration partners' },
  { icon: Landmark, label: 'County governments and public institutions' },
  { icon: Globe2, label: 'Development partners and sustainability programmes' },
  { icon: Microscope, label: 'Researchers and environmental practitioners' },
];

export default function Organisations() {
  return (
    <Page>
      <Seo
        title="For organisations"
        description="JuaMsitu helps companies, NGOs, county governments and development partners connect environmental data with sustainability decisions, monitoring and ESG reporting."
      />

      <PageHero
        image={images.aerial}
        title="Turn environmental responsibility into measurable insight."
        lead="Sustainability commitments matter. But meaningful progress requires reliable environmental information, consistent monitoring and evidence that supports transparent reporting."
      >
        <div className="btn-row">
          <Link to="/organisations/waitlist" className="btn btn--sun">
            <UserPlus aria-hidden="true" /> Create an account
          </Link>
          <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--ghost-light">
            <CalendarDays aria-hidden="true" /> Book a call
          </a>
        </div>
      </PageHero>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <p className="org-intro">
            JuaMsitu aims to help organisations connect environmental data with the decisions, actions
            and reporting that shape a more sustainable future.
          </p>
        </div>
      </section>

      {/* ESG explained */}
      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <h2>Understanding ESG and sustainability</h2>
            <p className="lead">
              ESG is a way of looking at an organisation's wider impact. It covers three areas.
            </p>
          </div>

          <div className="esg">
            {esg.map((e) => (
              <div className="esg__item" key={e.letter}>
                <span className="esg__letter" aria-hidden="true">{e.letter}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            ))}
          </div>

          <div className="why-monitor">
            <h3>Why environmental monitoring matters</h3>
            <div>
              <p>
                Responsible business depends on knowing what is actually happening on the ground. A
                sustainability strategy is only as strong as the information behind it, and environmental
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

      {/* How JuaMsitu can support */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How JuaMsitu can support organisations</h2>
            <p className="lead">
              The platform is being developed in stages. Talk to us about where it can help your work today.
            </p>
          </div>
          <div className="support-grid">
            {support.map((s) => (
              <article className="support-card" key={s.title}>
                <span className="support-card__icon"><s.icon aria-hidden="true" /></span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <h2>Who can work with JuaMsitu?</h2>
          </div>
          <ul className="audiences">
            {audiences.map((a) => (
              <li key={a.label}><a.icon aria-hidden="true" />{a.label}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work with us */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Let's make environmental impact more visible.</h2>
              <p>
                Whether you are strengthening your sustainability strategy, supporting restoration or
                looking for better ways to understand environmental change, let's explore how JuaMsitu
                can support your work.
              </p>
            </div>
            <div className="btn-row">
              <Link to="/organisations/waitlist" className="btn btn--teal">
                <UserPlus aria-hidden="true" /> Create an account
              </Link>
              <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
                <CalendarDays aria-hidden="true" /> Book a call
              </a>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
