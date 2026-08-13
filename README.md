# Paradise Nursery

Paradise Nursery est une application React + Vite de panier d'achat pour une
boutique en ligne de plantes d'intérieur.

## Fonctionnalites

- Page d'accueil avec **Welcome To Paradise Nursery** et un bouton **Commencer**.
- Page **Plante** avec trois catégories et six plantes uniques par catégorie.
- Carte produit avec miniature, nom, prix et bouton **Ajouter au panier**.
- Bouton **Ajouter au panier** désactivé après l'ajout du produit.
- Barre de navigation sur les pages produits et panier avec compteur dynamique.
- Page panier avec miniature, nom, prix unitaire, total par plante, quantité,
  suppression, montant total, bouton de paiement et bouton pour continuer les
  achats.
- Gestion du panier avec Redux Toolkit, actions, réducteur et store.
- Réducteurs du panier nommés `addItem`, `removeItem` et `updateQuantity`.
- Utilisation de hooks React comme `useState` et `useEffect`.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse locale affichée par Vite.
