import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Organisations from './pages/Organisations.jsx';
import Waitlist from './pages/Waitlist.jsx';
import Donate from './pages/Donate.jsx';
import Explore from './pages/Explore.jsx';
import Contact from './pages/Contact.jsx';
import { Privacy, Terms } from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Routes. Each page is wrapped by <Layout> (navigation + footer).
 * MotionConfig reducedMotion="user" honours the visitor's OS setting.
 */
export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/organisations" element={<Organisations />} />
            <Route path="/organisations/waitlist" element={<Waitlist />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  );
}
