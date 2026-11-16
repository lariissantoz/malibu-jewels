import { Card } from "primereact/card";
import { formatarMoeda, nomeCategoria } from "./utils";

function ProductCard({
  product,
  favorito,
  onFavorito,
  onComprar,
}) {
  const header = (
    <div className="product-image-container">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/500x500/ffe1ef/c21870?text=Malibu+Jewels";
        }}
      />

      <button
        className={`favorite-button ${favorito ? "favoritado" : ""}`}
        onClick={onFavorito}
        aria-label="Favoritar produto"
        type="button"
      >
        {favorito ? "♥" : "♡"}
      </button>
    </div>
  );

  return (
    <Card header={header} className="product-card h-full">
      <div className="product-info">
        <span className="product-category">
          ✦ {nomeCategoria(product.category)}
        </span>

        <h3>{product.title}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">
          <strong className="product-price">
            {formatarMoeda(product.price)}
          </strong>

          <button
            className="buy-button"
            onClick={onComprar}
            type="button"
          >
            ✧ Quero!
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;