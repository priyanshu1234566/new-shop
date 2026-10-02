import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowRight,
  FiArrowLeft,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiTag,
  FiPackage,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartItemCount,
    cartSubtotal,
    cartOriginalTotal,
    cartDiscount,
    deliveryCharge,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  /* EMPTY CART */
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty-section">
          <div className="cart-container">
            <div className="cart-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Cart</span>
            </div>

            <div className="empty-cart">
              <div className="empty-cart-icon">
                <FiShoppingCart />
              </div>

              <span className="section-eyebrow">
                YOUR SHOPPING CART
              </span>

              <h1>Your cart is empty</h1>

              <p>
                Looks like you haven't added anything to your cart
                yet. Explore our products and find something you
                love.
              </p>

              <div className="empty-cart-buttons">
                <Link to="/grocery" className="cart-primary-button">
                  Shop Grocery
                  <FiArrowRight />
                </Link>

                <Link
                  to="/home-kitchen"
                  className="cart-secondary-button"
                >
                  Home & Kitchen
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            <div className="cart-empty-features">
              <div>
                <FiTruck />
                <div>
                  <strong>Free Delivery</strong>
                  <span>On orders above ₹499</span>
                </div>
              </div>

              <div>
                <FiShield />
                <div>
                  <strong>Secure Shopping</strong>
                  <span>Safe & secure checkout</span>
                </div>
              </div>

              <div>
                <FiRefreshCw />
                <div>
                  <strong>Easy Returns</strong>
                  <span>Simple return process</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      {/* HEADER */}
      <section className="cart-header-section">
        <div className="cart-container">
          <div className="cart-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Shopping Cart</span>
          </div>

          <div className="cart-heading">
            <div>
              <span className="section-eyebrow">
                SHOPPING BAG
              </span>

              <h1>
                Your Shopping Cart
                <span className="cart-heading-count">
                  {cartItemCount}{" "}
                  {cartItemCount === 1 ? "item" : "items"}
                </span>
              </h1>

              <p>
                Review your items and proceed to secure checkout.
              </p>
            </div>

            <button
              type="button"
              className="clear-cart-button"
              onClick={clearCart}
            >
              <FiTrash2 />
              Clear Cart
            </button>
          </div>
        </div>
      </section>

      {/* CART CONTENT */}
      <section className="cart-content-section">
        <div className="cart-container">
          <div className="cart-layout">
            {/* LEFT */}
            <div className="cart-products-column">
              <div className="cart-products-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>

              <div className="cart-products-list">
                {cartItems.map((item) => {
                  const price = Number(item.price) || 0;
                  const oldPrice = Number(item.oldPrice) || 0;
                  const quantity = Number(item.quantity) || 1;
                  const itemTotal = price * quantity;

                  return (
                    <article
                      className="cart-product-item"
                      key={item.id}
                    >
                      {/* PRODUCT */}
                      <div className="cart-product-info">
                        <Link
                          to={`/product/${item.id}`}
                          className="cart-product-image"
                        >
                          <img
                            src={
                              item.image ||
                              "https://via.placeholder.com/200x200?text=Product"
                            }
                            alt={item.name || "Product"}
                          />
                        </Link>

                        <div className="cart-product-details">
                          {item.category && (
                            <span className="cart-product-category">
                              {item.category}
                            </span>
                          )}

                          <Link
                            to={`/product/${item.id}`}
                            className="cart-product-name"
                          >
                            {item.name}
                          </Link>

                          {item.unit && (
                            <span className="cart-product-unit">
                              {item.unit}
                            </span>
                          )}

                          <button
                            type="button"
                            className="mobile-remove-button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                          >
                            <FiTrash2 />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="cart-product-price">
                        <strong>{formatPrice(price)}</strong>

                        {oldPrice > price && (
                          <del>{formatPrice(oldPrice)}</del>
                        )}
                      </div>

                      {/* QUANTITY */}
                      <div className="cart-quantity">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label={`Decrease ${item.name}`}
                        >
                          <FiMinus />
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          aria-label={`Increase ${item.name}`}
                        >
                          <FiPlus />
                        </button>
                      </div>

                      {/* TOTAL */}
                      <div className="cart-product-total">
                        <strong>{formatPrice(itemTotal)}</strong>

                        <button
                          type="button"
                          className="desktop-remove-button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          aria-label={`Remove ${item.name}`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* CONTINUE SHOPPING */}
              <div className="cart-continue">
                <Link to="/grocery">
                  <FiArrowLeft />
                  Continue Shopping
                </Link>

                <span>
                  {cartItemCount}{" "}
                  {cartItemCount === 1 ? "item" : "items"} in your
                  cart
                </span>
              </div>

              {/* BENEFITS */}
              <div className="cart-benefits">
                <div className="cart-benefit">
                  <div className="cart-benefit-icon">
                    <FiTruck />
                  </div>
                  <div>
                    <strong>Free Delivery</strong>
                    <span>
                      Free shipping on orders above ₹499
                    </span>
                  </div>
                </div>

                <div className="cart-benefit">
                  <div className="cart-benefit-icon">
                    <FiShield />
                  </div>
                  <div>
                    <strong>Secure Payment</strong>
                    <span>
                      Your payment information is protected
                    </span>
                  </div>
                </div>

                <div className="cart-benefit">
                  <div className="cart-benefit-icon">
                    <FiPackage />
                  </div>
                  <div>
                    <strong>Quality Products</strong>
                    <span>
                      Carefully packed for safe delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - SUMMARY */}
            <aside className="cart-summary">
              <div className="cart-summary-card">
                <div className="cart-summary-header">
                  <h2>Order Summary</h2>
                  <span>{cartItemCount} items</span>
                </div>

                <div className="cart-summary-lines">
                  <div>
                    <span>Original Price</span>
                    <strong>
                      {formatPrice(cartOriginalTotal)}
                    </strong>
                  </div>

                  <div>
                    <span>Subtotal</span>
                    <strong>
                      {formatPrice(cartSubtotal)}
                    </strong>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="discount-line">
                      <span>
                        <FiTag />
                        You Save
                      </span>
                      <strong>
                        -{formatPrice(cartDiscount)}
                      </strong>
                    </div>
                  )}

                  <div>
                    <span>Delivery</span>

                    <strong
                      className={
                        deliveryCharge === 0
                          ? "free-delivery"
                          : ""
                      }
                    >
                      {deliveryCharge === 0
                        ? "FREE"
                        : formatPrice(deliveryCharge)}
                    </strong>
                  </div>
                </div>

                <div className="cart-summary-total">
                  <div>
                    <span>Total</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>

                  {cartDiscount > 0 && (
                    <small>
                      You saved {formatPrice(cartDiscount)} on
                      this order
                    </small>
                  )}
                </div>

                <button
                  type="button"
                  className="checkout-button"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <FiArrowRight />
                </button>

                <div className="secure-checkout">
                  <FiShield />
                  <span>
                    Secure checkout • Your data is protected
                  </span>
                </div>
              </div>

              {/* FREE DELIVERY PROGRESS */}
              {cartSubtotal < 499 && (
                <div className="delivery-progress-card">
                  <div className="delivery-progress-icon">
                    <FiTruck />
                  </div>

                  <div className="delivery-progress-content">
                    <strong>
                      Add{" "}
                      {formatPrice(499 - cartSubtotal)} more
                    </strong>

                    <span>
                      to unlock FREE delivery
                    </span>

                    <div className="delivery-progress-bar">
                      <span
                        style={{
                          width: `${Math.min(
                            (cartSubtotal / 499) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {cartSubtotal >= 499 && (
                <div className="delivery-unlocked-card">
                  <FiTruck />

                  <div>
                    <strong>Free delivery unlocked!</strong>
                    <span>
                      Your order qualifies for free shipping.
                    </span>
                  </div>
                </div>
              )}

              {/* PAYMENT METHODS */}
              <div className="payment-methods-card">
                <span>We accept</span>

                <div className="payment-methods">
                  <span>UPI</span>
                  <span>VISA</span>
                  <span>RuPay</span>
                  <span>COD</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;