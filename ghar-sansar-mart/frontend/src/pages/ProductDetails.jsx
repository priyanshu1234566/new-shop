import { useState } from "react";
import "../styles/pages css/projectdetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheck,
} from "react-icons/fi";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    isInCart,
    getCartQuantity,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="product-not-found">
        <div className="page-container">
          <div className="empty-products">
            <h2>Product Not Found</h2>

            <p>
              The product you are looking for
              does not exist.
            </p>

            <Link
              to="/"
              className="primary-button"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const price = Number(product.price) || 0;

  const oldPrice =
    Number(product.oldPrice) || 0;

  const rating =
    Number(product.rating) || 0;

  const reviewCount =
    Number(product.reviews) || 0;

  const stock =
    Number(product.stock) || 0;

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  const totalPrice =
    price * quantity;

  const inCart = isInCart(product.id);

  const cartQuantity =
    getCartQuantity(product.id);

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(
        (current) => current + 1
      );
    }
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="product-details-page">

      {/* Breadcrumb */}
      <div className="page-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>

          <span>/</span>

          <Link
            to={
              product.category ===
              "Grocery"
                ? "/grocery"
                : "/home-kitchen"
            }
          >
            {product.category}
          </Link>

          <span>/</span>

          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="product-details-section">
        <div className="page-container">

          <Link
            to={
              product.category ===
              "Grocery"
                ? "/grocery"
                : "/home-kitchen"
            }
            className="back-link"
          >
            <FiArrowLeft />
            Back to Products
          </Link>

          <div className="product-details-layout">

            {/* Image */}
            <div className="product-details-image-wrapper">

              <div className="product-details-image">

                {product.badge && (
                  <span className="product-details-badge">
                    {product.badge}
                  </span>
                )}

                {discount > 0 && (
                  <span className="product-details-discount">
                    {discount}% OFF
                  </span>
                )}

                <button
                  type="button"
                  className={`details-wishlist ${
                    isWishlisted
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setIsWishlisted(
                      (current) => !current
                    )
                  }
                  aria-label="Wishlist"
                >
                  <FiHeart
                    fill={
                      isWishlisted
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/700x700?text=Product"
                  }
                  alt={product.name}
                />
              </div>

              <div className="product-trust-points">

                <div>
                  <FiTruck />

                  <span>
                    Fast Delivery
                  </span>
                </div>

                <div>
                  <FiShield />

                  <span>
                    Secure Payment
                  </span>
                </div>

                <div>
                  <FiRefreshCw />

                  <span>
                    Easy Returns
                  </span>
                </div>

              </div>
            </div>

            {/* Information */}
            <div className="product-details-content">

              <span className="product-details-category">
                {product.category}
              </span>

              <h1>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="details-rating">

                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FiStar
                        key={star}
                        fill={
                          star <= rating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    )
                  )}
                </div>

                <strong>
                  {rating.toFixed(1)}
                </strong>

                <span>
                  ({reviewCount} Reviews)
                </span>
              </div>

              {/* Price */}
              <div className="details-price-box">

                <span className="details-price">
                  ₹
                  {price.toLocaleString(
                    "en-IN"
                  )}
                </span>

                {oldPrice > price && (
                  <>
                    <span className="details-old-price">
                      ₹
                      {oldPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span className="details-save">
                      Save ₹
                      {(
                        oldPrice - price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </>
                )}

              </div>

              {/* Unit */}
              {product.unit && (
                <div className="product-unit">
                  <span>
                    Quantity:
                  </span>

                  <strong>
                    {product.unit}
                  </strong>
                </div>
              )}

              {/* Description */}
              <div className="product-description">
                <h3>
                  Product Description
                </h3>

                <p>
                  {product.description ||
                    "High-quality product designed for your everyday needs."}
                </p>
              </div>

              {/* Stock */}
              <div className="product-stock">

                {stock > 0 ? (
                  <>
                    <FiCheck />

                    <span>
                      In Stock
                    </span>

                    {stock <= 10 && (
                      <small>
                        Only {stock} left
                      </small>
                    )}
                  </>
                ) : (
                  <span>
                    Out of Stock
                  </span>
                )}

              </div>

              {/* Quantity */}
              {stock > 0 && (
                <div className="details-quantity-section">

                  <span>
                    Quantity
                  </span>

                  <div className="details-quantity">

                    <button
                      type="button"
                      onClick={
                        decreaseQuantity
                      }
                      disabled={
                        quantity <= 1
                      }
                    >
                      <FiMinus />
                    </button>

                    <span>
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={
                        increaseQuantity
                      }
                      disabled={
                        quantity >= stock
                      }
                    >
                      <FiPlus />
                    </button>

                  </div>

                  <strong className="details-total">
                    ₹
                    {totalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>
              )}

              {/* Actions */}
              <div className="product-details-actions">

                <button
                  type="button"
                  className="details-cart-button"
                  onClick={
                    handleAddToCart
                  }
                  disabled={stock <= 0}
                >
                  <FiShoppingCart />

                  {inCart
                    ? `Add More (${cartQuantity})`
                    : "Add to Cart"}
                </button>

                <button
                  type="button"
                  className="details-buy-button"
                  onClick={handleBuyNow}
                  disabled={stock <= 0}
                >
                  Buy Now
                </button>

              </div>

              {/* Benefits */}
              <div className="product-benefits">

                <div className="benefit-item">
                  <FiTruck />

                  <div>
                    <strong>
                      Free Delivery
                    </strong>

                    <span>
                      On orders above ₹499
                    </span>
                  </div>
                </div>

                <div className="benefit-item">
                  <FiShield />

                  <div>
                    <strong>
                      Secure Checkout
                    </strong>

                    <span>
                      100% secure payments
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="page-container">

            <div className="section-heading-row">
              <div>
                <span className="section-label">
                  You May Also Like
                </span>

                <h2>
                  Related Products
                </h2>
              </div>
            </div>

            <div className="products-grid">
              {relatedProducts.map(
                (item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                )
              )}
            </div>

          </div>
        </section>
      )}

    </main>
  );
}

export default ProductDetails;