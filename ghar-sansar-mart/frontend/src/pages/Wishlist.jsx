import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages css/wish.css";
import {
  FiHeart,
  FiTrash2,
  FiShoppingCart,
  FiArrowRight,
  FiArrowLeft,
  FiPackage,
  FiStar,
} from "react-icons/fi";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const WISHLIST_STORAGE_KEY = "ghar_sansar_mart_wishlist";

function Wishlist() {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(
        WISHLIST_STORAGE_KEY
      );

      if (!savedWishlist) return [];

      const parsedWishlist = JSON.parse(savedWishlist);

      return Array.isArray(parsedWishlist)
        ? parsedWishlist
        : [];
    } catch (error) {
      console.error("Wishlist loading error:", error);
      return [];
    }
  });

  const { addToCart } = useCart();

  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistIds)
      );
    } catch (error) {
      console.error("Wishlist saving error:", error);
    }
  }, [wishlistIds]);

  const wishlistProducts = useMemo(() => {
    return products.filter((product) =>
      wishlistIds.includes(product.id)
    );
  }, [wishlistIds]);

  const removeFromWishlist = (productId) => {
    setWishlistIds((currentIds) =>
      currentIds.filter((id) => id !== productId)
    );
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  /* EMPTY WISHLIST */
  if (wishlistProducts.length === 0) {
    return (
      <main className="wishlist-page">
        <section className="wishlist-empty-section">
          <div className="wishlist-container">
            <div className="wishlist-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Wishlist</span>
            </div>

            <div className="empty-wishlist">
              <div className="empty-wishlist-icon">
                <FiHeart />
              </div>

              <span className="section-eyebrow">
                YOUR WISHLIST
              </span>

              <h1>Your wishlist is empty</h1>

              <p>
                Save your favorite products here and come back
                anytime to shop them.
              </p>

              <div className="empty-wishlist-buttons">
                <Link
                  to="/grocery"
                  className="wishlist-primary-button"
                >
                  Explore Grocery
                  <FiArrowRight />
                </Link>

                <Link
                  to="/home-kitchen"
                  className="wishlist-secondary-button"
                >
                  Home & Kitchen
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            <div className="wishlist-empty-features">
              <div>
                <FiHeart />
                <div>
                  <strong>Save Favorites</strong>
                  <span>Keep products you love</span>
                </div>
              </div>

              <div>
                <FiPackage />
                <div>
                  <strong>Shop Anytime</strong>
                  <span>Wishlist stays after refresh</span>
                </div>
              </div>

              <div>
                <FiShoppingCart />
                <div>
                  <strong>Buy Easily</strong>
                  <span>Add favorites directly to cart</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      {/* HEADER */}
      <section className="wishlist-header-section">
        <div className="wishlist-container">
          <div className="wishlist-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Wishlist</span>
          </div>

          <div className="wishlist-heading">
            <div>
              <span className="section-eyebrow">
                SAVED PRODUCTS
              </span>

              <h1>
                My Wishlist
                <span className="wishlist-heading-count">
                  {wishlistProducts.length}{" "}
                  {wishlistProducts.length === 1
                    ? "item"
                    : "items"}
                </span>
              </h1>

              <p>
                Your favorite products are saved here for easy
                access.
              </p>
            </div>

            <button
              type="button"
              className="clear-wishlist-button"
              onClick={clearWishlist}
            >
              <FiTrash2 />
              Clear Wishlist
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="wishlist-content-section">
        <div className="wishlist-container">
          <div className="wishlist-top-bar">
            <div>
              <FiHeart />
              <span>
                {wishlistProducts.length} saved{" "}
                {wishlistProducts.length === 1
                  ? "product"
                  : "products"}
              </span>
            </div>

            <Link to="/grocery">
              Continue Shopping
              <FiArrowRight />
            </Link>
          </div>

          <div className="wishlist-products-grid">
            {wishlistProducts.map((product) => {
              const price = Number(product.price) || 0;
              const oldPrice =
                Number(product.oldPrice) || 0;

              const discount =
                oldPrice > price
                  ? Math.round(
                      ((oldPrice - price) / oldPrice) * 100
                    )
                  : 0;

              return (
                <article
                  className="wishlist-product-card"
                  key={product.id}
                >
                  {/* IMAGE */}
                  <div className="wishlist-product-image">
                    {product.badge && (
                      <span className="wishlist-product-badge">
                        {product.badge}
                      </span>
                    )}

                    {discount > 0 && !product.badge && (
                      <span className="wishlist-product-badge">
                        {discount}% OFF
                      </span>
                    )}

                    <button
                      type="button"
                      className="wishlist-remove-icon"
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <FiHeart fill="currentColor" />
                    </button>

                    <Link
                      to={`/product/${product.id}`}
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
                  </div>

                  {/* CONTENT */}
                  <div className="wishlist-product-content">
                    {product.category && (
                      <span className="wishlist-product-category">
                        {product.category}
                      </span>
                    )}

                    <Link
                      to={`/product/${product.id}`}
                      className="wishlist-product-name"
                    >
                      {product.name}
                    </Link>

                    <div className="wishlist-product-rating">
                      <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            fill={
                              star <=
                              Number(product.rating || 0)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>

                      {product.reviews > 0 && (
                        <span>
                          ({product.reviews})
                        </span>
                      )}
                    </div>

                    <div className="wishlist-product-price">
                      <strong>
                        {formatPrice(price)}
                      </strong>

                      {oldPrice > price && (
                        <del>
                          {formatPrice(oldPrice)}
                        </del>
                      )}

                      {discount > 0 && (
                        <span>{discount}% OFF</span>
                      )}
                    </div>

                    <div className="wishlist-product-actions">
                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(product)
                        }
                        className="wishlist-cart-button"
                      >
                        <FiShoppingCart />
                        Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromWishlist(product.id)
                        }
                        className="wishlist-remove-button"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* BOTTOM */}
          <div className="wishlist-bottom">
            <Link to="/cart">
              <FiShoppingCart />
              View Cart
              <FiArrowRight />
            </Link>

            <Link to="/grocery">
              <FiArrowLeft />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wishlist-cta-section">
        <div className="wishlist-container">
          <div className="wishlist-cta">
            <div className="wishlist-cta-icon">
              <FiHeart />
            </div>

            <div>
              <span className="section-eyebrow">
                GHAR SANSAR MART
              </span>

              <h2>
                Find more products you’ll love.
              </h2>

              <p>
                Explore our latest grocery and home & kitchen
                essentials.
              </p>
            </div>

            <Link to="/home-kitchen">
              Explore Products
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Wishlist;