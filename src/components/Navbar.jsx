import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import Logo from './Logo.jsx';
import './Navbar.css';

const mainLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About JuaMsitu' },
  { to: '/#approach', label: 'Our approach' },
];

/**
 * Global navigation.
 * Transparent over the dark page heroes, solid once the visitor scrolls.
 * Collapses to a menu panel below 960px.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className={`nav ${solid ? 'nav--solid' : ''}`}>
      <div className="container nav__inner">
        <Logo tone={solid ? 'dark' : 'light'} />

        <nav className="nav__main" aria-label="Main">
          {mainLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `nav__link ${isActive && !l.to.includes('#') && !location.hash ? 'is-active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__utility">
          <NavLink to="/organisations" className="nav__link">For organisations</NavLink>
          <Link to="/donate" className="nav__donate">
            <Heart aria-hidden="true" />
            Donate
          </Link>
        </div>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="nav__panel"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container">
              {mainLinks.map((l) => (
                <Link key={l.label} to={l.to} className="nav__panel-link">{l.label}</Link>
              ))}
              <Link to="/organisations" className="nav__panel-link">For organisations</Link>
              <Link to="/explore" className="nav__panel-link">Explore platform</Link>
              <Link to="/donate" className="btn btn--sun nav__panel-cta">
                <Heart aria-hidden="true" /> Donate
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
