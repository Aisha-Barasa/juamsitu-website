import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top on page change, or to an anchor such as /#approach.
 * The short delay lets the page transition mount the target first.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
