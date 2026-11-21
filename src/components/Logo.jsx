import { Link } from 'react-router-dom';

/**
 * JuaMsitu logo: the emblem on a soft round badge (so it reads on dark
 * and light backgrounds) plus the wordmark set in Inter.
 */
export default function Logo({ tone = 'light', onClick }) {
  return (
    <Link to="/" className={`logo logo--${tone}`} onClick={onClick} aria-label="JuaMsitu home">
      <span className="logo__badge">
        <img src="/images/logo-mark.png" alt="" width="36" height="36" />
      </span>
      <span className="logo__word">JuaMsitu</span>
    </Link>
  );
}
