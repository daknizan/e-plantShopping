import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectTotalItems } from './CartSlice.jsx';
import { formatCurrency } from './utils/formatCurrency.js';

const plantCategories = [
  {
    id: 'aromatiques',
    title: 'Plantes aromatiques',
    description: 'Des plantes parfumées pour la cuisine, les infusions et les pièces ensoleillées.',
    plants: [
      {
        id: 'basilic-citron',
        category: 'Plantes aromatiques',
        name: 'Basilic citron',
        price: 14.99,
        image:
          'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'menthe-verte',
        category: 'Plantes aromatiques',
        name: 'Menthe verte',
        price: 11.5,
        image:
          'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'romarin-compact',
        category: 'Plantes aromatiques',
        name: 'Romarin compact',
        price: 18.75,
        image:
          'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'thym-argente',
        category: 'Plantes aromatiques',
        name: 'Thym argenté',
        price: 13.25,
        image:
          'https://images.unsplash.com/photo-1620803366004-119b57f54cd6?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'persil-frise',
        category: 'Plantes aromatiques',
        name: 'Persil frisé',
        price: 9.99,
        image:
          'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'coriandre-fraiche',
        category: 'Plantes aromatiques',
        name: 'Coriandre fraîche',
        price: 10.75,
        image:
          'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=700&q=80',
      },
    ],
  },
  {
    id: 'medicinales',
    title: 'Plantes médicinales',
    description: 'Des variétés apaisantes pour accompagner les rituels bien-être à la maison.',
    plants: [
      {
        id: 'aloe-vera',
        category: 'Plantes médicinales',
        name: 'Aloe vera',
        price: 22.99,
        image:
          'https://images.unsplash.com/photo-1596547609652-9cf5d8c25a41?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'lavande-douce',
        category: 'Plantes médicinales',
        name: 'Lavande douce',
        price: 19.25,
        image:
          'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'sauge-officinale',
        category: 'Plantes médicinales',
        name: 'Sauge officinale',
        price: 16.4,
        image:
          'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'camomille',
        category: 'Plantes médicinales',
        name: 'Camomille',
        price: 15.5,
        image:
          'https://images.unsplash.com/photo-1496857239036-1fb137683000?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'melisse',
        category: 'Plantes médicinales',
        name: 'Mélisse',
        price: 12.99,
        image:
          'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'eucalyptus',
        category: 'Plantes médicinales',
        name: 'Eucalyptus',
        price: 24.75,
        image:
          'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=700&q=80',
      },
    ],
  },
  {
    id: 'depolluantes',
    title: 'Plantes dépolluantes',
    description: 'Des plantes graphiques pour rafraîchir visuellement les salons, bureaux et chambres.',
    plants: [
      {
        id: 'monstera-deliciosa',
        category: 'Plantes dépolluantes',
        name: 'Monstera deliciosa',
        price: 34.99,
        image:
          'https://images.unsplash.com/photo-1614594075920-ea2b4ec4f3b6?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'pothos-dore',
        category: 'Plantes dépolluantes',
        name: 'Pothos doré',
        price: 17.99,
        image:
          'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'sansevieria',
        category: 'Plantes dépolluantes',
        name: 'Sansevieria',
        price: 24.5,
        image:
          'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'ficus-lyrata',
        category: 'Plantes dépolluantes',
        name: 'Ficus lyrata',
        price: 39.9,
        image:
          'https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'palmier-areca',
        category: 'Plantes dépolluantes',
        name: 'Palmier areca',
        price: 29.5,
        image:
          'https://images.unsplash.com/photo-1600421684578-5940b2847a47?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'chlorophytum',
        category: 'Plantes dépolluantes',
        name: 'Chlorophytum',
        price: 15.99,
        image:
          'https://images.unsplash.com/photo-1612363228106-c94b0754e797?auto=format&fit=crop&w=700&q=80',
      },
    ],
  },
];

function Navigation() {
  const totalItems = useSelector(selectTotalItems);

  return (
    <nav className="top-nav" aria-label="Navigation principale">
      <a className="brand-link" href="#/">
        Paradise Nursery
      </a>
      <div className="nav-pages">
        <a href="#/">Accueil</a>
        <a href="#/products">Plante</a>
        <a className="cart-link" href="#/cart" aria-label={`${totalItems} articles dans le panier`}>
          <span className="cart-icon" aria-hidden="true">
            &#128722;
          </span>
          Panier
          <span className="cart-count">{totalItems}</span>
        </a>
      </div>
    </nav>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedPlantIds, setAddedPlantIds] = useState(() => Object.keys(cartItems));
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAddedPlantIds(Object.keys(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setMessage(''), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [message]);

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
    setAddedPlantIds((currentIds) => [...new Set([...currentIds, plant.id])]);
    setMessage(`${plant.name} a été ajouté au panier.`);
  };

  return (
    <div className="shop-page">
      <Navigation />

      <main className="catalog">
        <section className="page-intro">
          <p className="eyebrow">Catalogue</p>
          <h1>Plantes d'intérieur</h1>
          <p>
            Choisissez parmi trois catégories et ajoutez vos plantes préférées au
            panier. Le bouton se désactive quand la plante est déjà ajoutée.
          </p>
        </section>

        {plantCategories.map((category) => (
          <section className="plant-category" key={category.id}>
            <div className="section-heading">
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>

            <div className="plant-grid">
              {category.plants.map((plant) => {
                const isAdded = addedPlantIds.includes(plant.id);

                return (
                  <article className="plant-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} loading="lazy" />
                    <div className="plant-card-body">
                      <span>{category.title}</span>
                      <h3>{plant.name}</h3>
                      <p>{formatCurrency(plant.price)}</p>
                      <button
                        type="button"
                        className="primary-button"
                        disabled={isAdded}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? 'Ajouté au panier' : 'Ajouter au panier'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {message && (
        <div className="toast" role="status" aria-live="polite">
          {message}
        </div>
      )}
    </div>
  );
}

export { Navigation, plantCategories };
