import { Link } from 'react-router-dom';
import { CircleDot, CalendarDays } from 'lucide-react';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import SmartImage from '../components/SmartImage.jsx';
import Graticule from '../components/Graticule.jsx';
import { site, images, team, partners } from '../config/site.js';
import './pages.css';

const problems = [
  'Environmental information can be difficult to access and interpret.',
  'Forest monitoring needs consistent and accessible insights.',
  'Restoration and conservation decisions benefit from reliable evidence.',
  'Organisations need stronger ways to understand and communicate environmental progress.',
];

export default function About() {
  return (
    <Page>
      <Seo
        title="About JuaMsitu"
        description="JuaMsitu exists to make environmental intelligence more accessible and useful, supporting better decisions for forests, ecosystems and the communities that depend on them."
      />

      <PageHero
        image={images.hero}
        title="A future where every forest can be understood, valued and protected."
        lead="JuaMsitu means 'know the forest' in Swahili. It's an environmental intelligence platform that connects data, people and action."
      />

      {/* Problem */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Why JuaMsitu exists</h2>
            <p className="lead">
              Forests are more than landscapes. They are living systems that need to be understood,
              monitored and protected. Today, that is harder than it should be.
            </p>
          </div>
          <ul className="problems">
            {problems.map((p) => (
              <li key={p}><CircleDot aria-hidden="true" />{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="section section--dark">
        <div className="container statements">
          <div className="statement">
            <p className="statement__label">Our mission</p>
            <p>
              To make environmental intelligence more accessible and useful, supporting better decisions for
              forests, ecosystems and the communities that depend on them.
            </p>
          </div>
          <div className="statement">
            <p className="statement__label">Our vision</p>
            <p>
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

      {/* People and partnerships */}
      <section className="section section--mist">
        <div className="container">
          <div className="section-head">
            <h2>The people and partnerships behind JuaMsitu</h2>
            <p className="lead">
              JuaMsitu is built with people who care about forests and the communities around them.
            </p>
          </div>

          {/* Add verified team members in src/config/site.js */}
          {team.length > 0 ? (
            <div className="people-grid">
              {team.map((m) => (
                <article className="person" key={m.name}>
                  {m.photo && <img src={m.photo} alt={m.name} loading="lazy" />}
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                  {m.bio && <p>{m.bio}</p>}
                </article>
              ))}
            </div>
          ) : (
            <div className="placeholder-box">
              <p>Team profiles are coming soon.</p>
              <p>
                Interested in partnering with us?{' '}
                <a href={`mailto:${site.email}`}>Email {site.email}</a> or{' '}
                <a href={site.bookingUrl} target="_blank" rel="noreferrer">book a call</a>.
              </p>
            </div>
          )}

          {/* Add verified partner logos in src/config/site.js */}
          {partners.length > 0 && (
            <div className="partner-logos" style={{ marginTop: '3rem' }}>
              {partners.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer">
                  <img src={p.logo} alt={p.name} loading="lazy" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
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
