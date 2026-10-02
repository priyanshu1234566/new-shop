import { useState } from "react";
import "../styles/pages css/checkout.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCreditCard,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTruck,
  FiUser,
  FiPackage,
  FiLock,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartItemCount,
    cartSubtotal,
    cartDiscount,
    deliveryCharge,
    cartTotal,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [errors, setErrors] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });
      return;
    }

    setPlacingOrder(true);

    const orderId = `GSM${Date.now().toString().slice(-8)}`;

    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "Placed",
      paymentMethod,
      customer: formData,
      items: cartItems,
      itemCount: cartItemCount,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryCharge,
      total: cartTotal,
    };

    try {
      const existingOrders =
        JSON.parse(
          localStorage.getItem("ghar_sansar_mart_orders")
        ) || [];

      localStorage.setItem(
        "ghar_sansar_mart_orders",
        JSON.stringify([order, ...existingOrders])
      );

      clearCart();

      navigate(`/orders?success=${orderId}`);
    } catch (error) {
      console.error("Order saving error:", error);
      setPlacingOrder(false);
    }
  };

  /* EMPTY CART */
  if (cartItems.length === 0 && !placingOrder) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty-section">
          <div className="checkout-container">
            <div className="checkout-empty-icon">
              <FiPackage />
            </div>

            <span className="section-eyebrow">
              CHECKOUT
            </span>

            <h1>Your cart is empty</h1>

            <p>
              Add some products to your cart before proceeding
              to checkout.
            </p>

            <Link
              to="/grocery"
              className="checkout-empty-button"
            >
              Start Shopping
              <FiArrowRight />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      {/* HEADER */}
      <section className="checkout-header-section">
        <div className="checkout-container">
          <div className="checkout-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/cart">Cart</Link>
            <span>/</span>
            <span>Checkout</span>
          </div>

          <div className="checkout-heading">
            <div>
              <span className="section-eyebrow">
                SECURE CHECKOUT
              </span>

              <h1>Complete Your Order</h1>

              <p>
                Enter your delivery details and choose your
                preferred payment method.
              </p>
            </div>

            <div className="checkout-security">
              <FiLock />
              <span>100% Secure Checkout</span>
            </div>
          </div>

          {/* STEPS */}
          <div className="checkout-steps">
            <div className="checkout-step active">
              <span>
                <FiMapPin />
              </span>
              <div>
                <strong>1. Delivery</strong>
                <small>Address details</small>
              </div>
            </div>

            <div className="checkout-step-line" />

            <div className="checkout-step active">
              <span>
                <FiCreditCard />
              </span>
              <div>
                <strong>2. Payment</strong>
                <small>Payment method</small>
              </div>
            </div>

            <div className="checkout-step-line" />

            <div className="checkout-step">
              <span>
                <FiCheck />
              </span>
              <div>
                <strong>3. Confirmation</strong>
                <small>Order placed</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="checkout-content-section">
        <div className="checkout-container">
          <form
            className="checkout-layout"
            onSubmit={handlePlaceOrder}
          >
            {/* LEFT */}
            <div className="checkout-main">
              {/* DELIVERY ADDRESS */}
              <section className="checkout-card">
                <div className="checkout-card-header">
                  <div className="checkout-card-icon">
                    <FiMapPin />
                  </div>

                  <div>
                    <h2>Delivery Address</h2>
                    <p>
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="checkout-form-grid">
                  {/* NAME */}
                  <div className="checkout-field">
                    <label htmlFor="fullName">
                      Full Name <span>*</span>
                    </label>

                    <div className="checkout-input-wrapper">
                      <FiUser />

                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.fullName && (
                      <small className="checkout-error">
                        {errors.fullName}
                      </small>
                    )}
                  </div>

                  {/* PHONE */}
                  <div className="checkout-field">
                    <label htmlFor="phone">
                      Phone Number <span>*</span>
                    </label>

                    <div className="checkout-input-wrapper">
                      <FiPhone />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength="10"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.phone && (
                      <small className="checkout-error">
                        {errors.phone}
                      </small>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div className="checkout-field full-width">
                    <label htmlFor="email">
                      Email Address{" "}
                      <span className="optional">
                        (Optional)
                      </span>
                    </label>

                    <div className="checkout-input-wrapper">
                      <FiUser />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.email && (
                      <small className="checkout-error">
                        {errors.email}
                      </small>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div className="checkout-field full-width">
                    <label htmlFor="address">
                      Complete Address <span>*</span>
                    </label>

                    <div className="checkout-textarea-wrapper">
                      <FiMapPin />

                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        placeholder="House/Flat No., Street, Area, Colony"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.address && (
                      <small className="checkout-error">
                        {errors.address}
                      </small>
                    )}
                  </div>

                  {/* CITY */}
                  <div className="checkout-field">
                    <label htmlFor="city">
                      City <span>*</span>
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                    />

                    {errors.city && (
                      <small className="checkout-error">
                        {errors.city}
                      </small>
                    )}
                  </div>

                  {/* STATE */}
                  <div className="checkout-field">
                    <label htmlFor="state">
                      State <span>*</span>
                    </label>

                    <input
                      id="state"
                      name="state"
                      type="text"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleChange}
                    />

                    {errors.state && (
                      <small className="checkout-error">
                        {errors.state}
                      </small>
                    )}
                  </div>

                  {/* PINCODE */}
                  <div className="checkout-field">
                    <label htmlFor="pincode">
                      Pincode <span>*</span>
                    </label>

                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength="6"
                      placeholder="6-digit pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />

                    {errors.pincode && (
                      <small className="checkout-error">
                        {errors.pincode}
                      </small>
                    )}
                  </div>

                  {/* LANDMARK */}
                  <div className="checkout-field">
                    <label htmlFor="landmark">
                      Landmark{" "}
                      <span className="optional">
                        (Optional)
                      </span>
                    </label>

                    <input
                      id="landmark"
                      name="landmark"
                      type="text"
                      placeholder="Nearby landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>

              {/* PAYMENT */}
              <section className="checkout-card">
                <div className="checkout-card-header">
                  <div className="checkout-card-icon">
                    <FiCreditCard />
                  </div>

                  <div>
                    <h2>Payment Method</h2>
                    <p>
                      Choose how you want to pay.
                    </p>
                  </div>
                </div>

                <div className="payment-options">
                  {/* COD */}
                  <label
                    className={`payment-option ${
                      paymentMethod === "cod"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                    />

                    <div className="payment-option-radio">
                      <span />
                    </div>

                    <div className="payment-option-icon">
                      <FiPackage />
                    </div>

                    <div className="payment-option-content">
                      <strong>
                        Cash on Delivery
                      </strong>
                      <span>
                        Pay when your order arrives
                      </span>
                    </div>

                    <div className="payment-option-badge">
                      Available
                    </div>
                  </label>

                  {/* UPI */}
                  <label
                    className={`payment-option ${
                      paymentMethod === "upi"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                    />

                    <div className="payment-option-radio">
                      <span />
                    </div>

                    <div className="payment-option-icon">
                      <FiCreditCard />
                    </div>

                    <div className="payment-option-content">
                      <strong>UPI</strong>
                      <span>
                        Google Pay, PhonePe, Paytm & more
                      </span>
                    </div>

                    <div className="payment-option-badge">
                      Secure
                    </div>
                  </label>

                  {/* CARD */}
                  <label
                    className={`payment-option ${
                      paymentMethod === "card"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                    />

                    <div className="payment-option-radio">
                      <span />
                    </div>

                    <div className="payment-option-icon">
                      <FiCreditCard />
                    </div>

                    <div className="payment-option-content">
                      <strong>Credit / Debit Card</strong>
                      <span>
                        Visa, Mastercard, RuPay & more
                      </span>
                    </div>

                    <div className="payment-option-badge">
                      Secure
                    </div>
                  </label>
                </div>

                {paymentMethod === "upi" && (
                  <div className="payment-info-box">
                    <FiShield />

                    <div>
                      <strong>
                        UPI payment will be available
                      </strong>

                      <span>
                        You will be redirected to a secure
                        payment screen after placing the
                        order.
                      </span>
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="payment-info-box">
                    <FiShield />

                    <div>
                      <strong>
                        Secure card payment
                      </strong>

                      <span>
                        Your card details will be processed
                        securely by our payment gateway.
                      </span>
                    </div>
                  </div>
                )}
              </section>

              {/* DELIVERY INFO */}
              <div className="checkout-delivery-info">
                <div>
                  <FiTruck />
                </div>

                <div>
                  <strong>
                    Estimated Delivery
                  </strong>

                  <span>
                    Your order will generally be delivered
                    within 3–7 business days.
                  </span>
                </div>
              </div>

              {/* MOBILE PLACE ORDER */}
              <button
                type="submit"
                className="mobile-place-order-button"
                disabled={placingOrder}
              >
                {placingOrder ? (
                  <>
                    <span className="checkout-spinner" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order
                    <FiArrowRight />
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="back-to-cart-link"
              >
                <FiArrowLeft />
                Back to Cart
              </Link>
            </div>

            {/* RIGHT SUMMARY */}
            <aside className="checkout-sidebar">
              <div className="checkout-summary-card">
                <div className="checkout-summary-header">
                  <div>
                    <span className="section-eyebrow">
                      ORDER DETAILS
                    </span>

                    <h2>Order Summary</h2>
                  </div>

                  <span className="checkout-item-count">
                    {cartItemCount} items
                  </span>
                </div>

                {/* ITEMS */}
                <div className="checkout-items">
                  {cartItems.map((item) => {
                    const price = Number(item.price) || 0;
                    const quantity =
                      Number(item.quantity) || 1;

                    return (
                      <div
                        className="checkout-item"
                        key={item.id}
                      >
                        <Link
                          to={`/product/${item.id}`}
                          className="checkout-item-image"
                        >
                          <img
                            src={
                              item.image ||
                              "https://via.placeholder.com/100x100?text=Product"
                            }
                            alt={item.name}
                          />

                          <span>
                            {quantity}
                          </span>
                        </Link>

                        <div className="checkout-item-details">
                          <Link
                            to={`/product/${item.id}`}
                          >
                            {item.name}
                          </Link>

                          <span>
                            {quantity} ×{" "}
                            {formatPrice(price)}
                          </span>
                        </div>

                        <strong>
                          {formatPrice(
                            price * quantity
                          )}
                        </strong>
                      </div>
                    );
                  })}
                </div>

                {/* TOTALS */}
                <div className="checkout-summary-lines">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      {formatPrice(cartSubtotal)}
                    </strong>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="checkout-discount">
                      <span>Discount</span>
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
                          ? "checkout-free"
                          : ""
                      }
                    >
                      {deliveryCharge === 0
                        ? "FREE"
                        : formatPrice(
                            deliveryCharge
                          )}
                    </strong>
                  </div>
                </div>

                <div className="checkout-grand-total">
                  <span>Total Amount</span>
                  <strong>
                    {formatPrice(cartTotal)}
                  </strong>
                </div>

                {/* DESKTOP PLACE ORDER */}
                <button
                  type="submit"
                  className="place-order-button"
                  disabled={placingOrder}
                >
                  {placingOrder ? (
                    <>
                      <span className="checkout-spinner" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order
                      <FiArrowRight />
                    </>
                  )}
                </button>

                <div className="checkout-secure-note">
                  <FiShield />
                  <span>
                    Secure payment & protected checkout
                  </span>
                </div>
              </div>

              {/* TRUST BOX */}
              <div className="checkout-trust-card">
                <div>
                  <FiShield />
                  <div>
                    <strong>Safe & Secure</strong>
                    <span>
                      Your information is protected.
                    </span>
                  </div>
                </div>

                <div>
                  <FiTruck />
                  <div>
                    <strong>Reliable Delivery</strong>
                    <span>
                      Carefully packed & delivered.
                    </span>
                  </div>
                </div>

                <div>
                  <FiCheck />
                  <div>
                    <strong>Quality Products</strong>
                    <span>
                      Trusted products for your home.
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Checkout;