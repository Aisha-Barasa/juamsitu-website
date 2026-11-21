import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import './pages.css';

export default function NotFound() {
  return (
    <Page>
      <Seo title="Page not found" />
      <PageHero compact title="This path doesn't lead anywhere." lead="The page may have moved. Head back home to find your way.">
        <Link to="/" className="btn btn--sun">Go to the home page</Link>
      </PageHero>
    </Page>
  );
}
