import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiStar,
  FiEye,
  FiCheck,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    isInCart,
    getCartQuantity,
  } = useCart();

  if (!product) {
    return null;
  }

  const productId = product.id;

  const price = Number(product.price) || 0;

  const oldPrice =
    Number(product.oldPrice) || 0;

  const rating =
    Number(product.rating) || 0;

  const reviewCount =
    Number(product.reviews) || 0;

  const quantity =
    getCartQuantity(productId);

  const inCart = isInCart(productId);

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleWishlist = () => {
    setIsWishlisted((current) => !current);
  };

  return (
    <article className="product-card">
      {/* Product Image */}
      <div className="product-card-image">
        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        {discount > 0 && !product.badge && (
          <span className="product-badge discount-badge">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          className={`product-wishlist ${
            isWishlisted
              ? "active"
              : ""
          }`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <FiHeart
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <Link
          to={`/product/${productId}`}
          className="product-image-link"
        >
          <img
            src={
              product.image ||
              "https://via.placeholder.com/500x500?text=Product"
            }
            alt={product.name || "Product"}
            loading="lazy"
          />
        </Link>

        <Link
          to={`/product/${productId}`}
          className="product-view-button"
        >
          <FiEye />
          <span>Quick View</span>
        </Link>
      </div>

      {/* Product Information */}
      <div className="product-card-content">
        {product.category && (
          <span className="product-category">
            {product.category}
          </span>
        )}

        <Link
          to={`/product/${productId}`}
          className="product-title"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <FiStar
                  key={star}
                  className={
                    star <= rating
                      ? "filled"
                      : ""
                  }
                  fill={
                    star <= rating
                      ? "currentColor"
                      : "none"
                  }
                />
              )
            )}
          </div>

          {reviewCount > 0 && (
            <span>
              ({reviewCount})
            </span>
          )}
        </div>

        {/* Price */}
        <div className="product-price-row">
          <div className="product-prices">
            <span className="product-price">
              ₹{price.toLocaleString("en-IN")}
            </span>

            {oldPrice > price && (
              <span className="product-old-price">
                ₹
                {oldPrice.toLocaleString(
                  "en-IN"
                )}
              </span>
            )}
          </div>

          {discount > 0 && (
            <span className="product-discount">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Cart Button */}
        {!inCart ? (
          <button
            type="button"
            className="product-add-button"
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        ) : (
          <div className="product-quantity-control">
            <button
              type="button"
              onClick={() =>
                decreaseQuantity(productId)
              }
              aria-label="Decrease quantity"
            >
              <FiMinus />
            </button>

            <span className="product-quantity">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                increaseQuantity(productId)
              }
              aria-label="Increase quantity"
            >
              <FiPlus />
            </button>

            <span className="added-label">
              <FiCheck />
              Added
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;