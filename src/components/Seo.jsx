import { useEffect } from 'react';

/**
 * Sets the page title and meta description for each route.
 * Usage: <Seo title="Donate" description="..." />
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title
      ? `${title} | JuaMsitu`
      : 'JuaMsitu | Environmental intelligence for healthier forests';

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
