import { useEffect, useState } from 'react';
import AboutUs from './AboutUs.jsx';
import CartItem from './CartItem.jsx';
import ProductList from './ProductList.jsx';

const pageTitles = {
  home: 'Accueil',
  products: 'Plantes',
  cart: 'Panier',
};

function getPageFromHash() {
  const currentHash = window.location.hash.replace('#', '');

  if (currentHash === '/products') {
    return 'products';
  }

  if (currentHash === '/cart') {
    return 'cart';
  }

  return 'home';
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash);
  const [showAbout, setShowAbout] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.title = `${pageTitles[page]} | Paradise Nursery`;
  }, [page]);

  const startShopping = () => {
    window.location.hash = '/products';
  };

  if (page === 'products') {
    return <ProductList />;
  }

  if (page === 'cart') {
    return <CartItem />;
  }

  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-content">
          <p className="eyebrow">Boutique de plantes d'intérieur</p>
          <h1 id="home-title">Paradise Nursery</h1>
          <p>
            Transformez votre maison avec des plantes d'intérieur fraîches,
            élégantes et faciles à entretenir, sélectionnées pour apporter une
            touche de nature à chaque pièce.
          </p>

          <div className="home-actions">
            <button type="button" className="primary-button large" onClick={startShopping}>
              Commencer
            </button>
            <button
              type="button"
              className="secondary-button large"
              onClick={() => setShowAbout((visible) => !visible)}
            >
              {showAbout ? "Masquer l'entreprise" : "Voir l'entreprise"}
            </button>
          </div>
        </div>
      </section>

      {showAbout && <AboutUs />}
    </main>
  );
}
