export default function AboutUs() {
  return (
    <section className="about-section" aria-labelledby="about-title">
      <div className="section-heading">
        <p className="eyebrow">À propos</p>
        <h2 id="about-title">Une pépinière pensée pour la maison</h2>
      </div>

      <div className="about-grid">
        <article>
          <h3>Notre entreprise</h3>
          <p>
            Paradise Nursery est une boutique en ligne spécialisée dans les
            plantes d'intérieur. Nous aidons les clients à choisir des plantes
            belles, saines et adaptées aux appartements, maisons, bureaux et
            espaces lumineux.
          </p>
        </article>

        <article>
          <h3>Notre mission</h3>
          <p>
            Notre mission est de rendre le jardinage intérieur simple et
            agréable. Chaque plante est présentée avec son prix, son style et
            une description claire pour faciliter l'achat.
          </p>
        </article>

        <article>
          <h3>Notre promesse</h3>
          <p>
            Nous privilégions des plantes robustes, une expérience d'achat
            fluide et un panier clair afin que chaque client puisse composer son
            coin vert sans complication.
          </p>
        </article>
      </div>
    </section>
  );
}
