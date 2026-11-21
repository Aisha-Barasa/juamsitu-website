import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollManager from './ScrollManager.jsx';

/** Shared page frame: skip link, navigation, main content and footer. */
export default function Layout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollManager />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
