import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  selectCartItems,
  selectTotalItems,
  updateQuantity,
} from './CartSlice.jsx';
import { Navigation } from './ProductList.jsx';
import { formatCurrency } from './utils/formatCurrency.js';

export function calculateCartTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export default function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const cartTotal = useMemo(() => calculateCartTotal(cartItems), [cartItems]);

  useEffect(() => {
    if (!checkoutMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setCheckoutMessage(''), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [checkoutMessage]);

  const handleQuantityChange = (item, quantity) => {
    dispatch(updateQuantity({ id: item.id, quantity }));
  };

  return (
    <div className="cart-page">
      <Navigation />

      <main className="cart-main">
        <section className="page-intro">
          <p className="eyebrow">Panier d'achat</p>
          <h1>Votre panier Paradise Nursery</h1>
          <p>
            {totalItems > 0
              ? `${totalItems} article${totalItems > 1 ? 's' : ''} sélectionné${totalItems > 1 ? 's' : ''}.`
              : 'Votre panier est vide pour le moment.'}
          </p>
        </section>

        <section className="cart-total-panel" aria-label="Montant total du panier">
          <span>Montant total du panier</span>
          <strong>{formatCurrency(cartTotal)}</strong>
        </section>

        {cartItems.length === 0 ? (
          <section className="empty-cart">
            <h2>Aucune plante dans le panier</h2>
            <p>
              Retournez à la liste des produits pour ajouter une plante
              aromatique, médicinale ou dépolluante.
            </p>
            <a className="primary-button" href="#/products">
              Continuer vos achats
            </a>
          </section>
        ) : (
          <section className="cart-layout" aria-label="Articles du panier">
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-card" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-card-info">
                    <span>{item.category}</span>
                    <h2>{item.name}</h2>
                    <p>Prix unitaire : {formatCurrency(item.price)}</p>
                    <p>Total pour cette plante : {formatCurrency(item.price * item.quantity)}</p>
                  </div>

                  <div className="quantity-actions" aria-label={`Quantité de ${item.name}`}>
                    <button
                      type="button"
                      aria-label={`Diminuer ${item.name}`}
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    >
                      -
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      type="button"
                      aria-label={`Augmenter ${item.name}`}
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Supprimer
                  </button>
                </article>
              ))}
            </div>

            <aside className="checkout-panel">
              <h2>Résumé</h2>
              <div className="summary-line">
                <span>Articles</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-line">
                <span>Total plantes</span>
                <strong>{formatCurrency(cartTotal)}</strong>
              </div>

              <button
                type="button"
                className="primary-button"
                onClick={() => setCheckoutMessage('Paiement à venir.')}
              >
                Passer à la caisse
              </button>
              <a className="secondary-button" href="#/products">
                Continuer vos achats
              </a>

              {checkoutMessage && (
                <p className="checkout-message" role="status" aria-live="polite">
                  {checkoutMessage}
                </p>
              )}
            </aside>
          </section>
        )}
      </main>
    </div>
  );
}
