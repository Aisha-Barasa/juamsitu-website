import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { site } from '../config/site.js';
import './Footer.css';

const links = [
  { to: '/about', label: 'About' },
  { to: '/#approach', label: 'Our approach' },
  { to: '/organisations', label: 'Organisations' },
  { to: '/explore', label: 'Explore platform' },
  { to: '/donate', label: 'Donate' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = site.socials.filter((s) => s.url);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__badge">
              <img src="/images/logo-mark.png" alt="" width="40" height="40" />
            </span>
            <span className="footer__name">{site.name}</span>
          </div>
          <p className="footer__tagline">{site.footerTagline}</p>
          <p className="footer__desc">{site.shortDescription}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer__heading">Explore</h2>
          <ul className="footer__list">
            {links.map((l) => (
              <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__heading">Get in touch</h2>
          <a className="footer__email" href={`mailto:${site.email}`}>
            <Mail aria-hidden="true" /> {site.email}
          </a>
          <a className="footer__book" href={site.bookingUrl} target="_blank" rel="noreferrer">
            Book a call
          </a>

          {/* Social profiles appear here once you add their URLs in src/config/site.js */}
          {socials.length > 0 && (
            <ul className="footer__socials">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {year} {site.name}. All rights reserved.</p>
        <div className="footer__legal">
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms of use</Link>
        </div>
      </div>
    </footer>
  );
}
