import { useEffect, useState } from "react";
import "../styles/pages css/myorders.css";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBox,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCreditCard,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTruck,
  FiUser,
} from "react-icons/fi";

const ORDERS_STORAGE_KEY = "ghar_sansar_mart_orders";
const LOGIN_STORAGE_KEY = "ghar_sansar_mart_logged_in";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const [searchParams] = useSearchParams();
  const successOrderId = searchParams.get("success");

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem(
        ORDERS_STORAGE_KEY
      );

      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);

        if (Array.isArray(parsedOrders)) {
          setOrders(parsedOrders);
        }
      }
    } catch (error) {
      console.error("Orders loading error:", error);
    }

    try {
      const savedUser = localStorage.getItem(
        LOGIN_STORAGE_KEY
      );

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);

        if (parsedUser && parsedUser.loggedIn) {
          setLoggedInUser(parsedUser);
        }
      }
    } catch (error) {
      console.error("User loading error:", error);
    }
  }, []);

  const toggleOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentLabel = (method) => {
    if (method === "cod") return "Cash on Delivery";
    if (method === "upi") return "UPI";
    if (method === "card") return "Credit / Debit Card";

    return method || "Payment";
  };

  const getStatusIcon = (status) => {
    const value = String(status || "").toLowerCase();

    if (
      value.includes("deliver") ||
      value.includes("complete")
    ) {
      return <FiCheckCircle />;
    }

    if (
      value.includes("ship") ||
      value.includes("transit")
    ) {
      return <FiTruck />;
    }

    return <FiClock />;
  };

  const getStatusClass = (status) => {
    const value = String(status || "").toLowerCase();

    if (
      value.includes("deliver") ||
      value.includes("complete")
    ) {
      return "order-status-delivered";
    }

    if (
      value.includes("ship") ||
      value.includes("transit")
    ) {
      return "order-status-shipped";
    }

    if (value.includes("cancel")) {
      return "order-status-cancelled";
    }

    return "order-status-placed";
  };

  // =========================
  // LOGIN REQUIRED
  // =========================

  if (!loggedInUser) {
    return (
      <main className="orders-page">
        <section className="orders-login-section">
          <div className="orders-login-card">

            <div className="orders-login-icon">
              <FiPackage />
            </div>

            <span className="orders-eyebrow">
              MY ORDERS
            </span>

            <h1>Login to view your orders</h1>

            <p>
              Please login to your Ghar Sansar Mart
              account to view your orders and track
              your purchases.
            </p>

            <div className="orders-login-actions">

              <Link
                to="/login"
                className="orders-primary-btn"
              >
                <FiUser />
                Login to Account
              </Link>

              <Link
                to="/register"
                className="orders-secondary-btn"
              >
                Create Account
              </Link>

            </div>

            <Link
              to="/"
              className="orders-back-link"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>

          </div>
        </section>
      </main>
    );
  }

  // =========================
  // MAIN ORDERS PAGE
  // =========================

  return (
    <main className="orders-page">

      {/* HERO */}
      <section className="orders-hero">
        <div className="orders-container">

          <div className="orders-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>My Orders</span>
          </div>

          <div className="orders-hero-content">

            <div>
              <span className="orders-eyebrow">
                ORDER HISTORY
              </span>

              <h1>My Orders</h1>

              <p>
                Track and manage all your Ghar Sansar
                Mart purchases in one place.
              </p>
            </div>

            <div className="orders-user-card">

              <div className="orders-user-avatar">
                {loggedInUser.name
                  ? loggedInUser.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div>
                <span>Welcome back</span>

                <strong>
                  {loggedInUser.name || "Customer"}
                </strong>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SUCCESS MESSAGE */}

      {successOrderId && (
        <section className="orders-success-wrapper">
          <div className="orders-container">

            <div className="orders-success-card">

              <div className="orders-success-icon">
                <FiCheckCircle />
              </div>

              <div className="orders-success-content">

                <strong>
                  Order placed successfully!
                </strong>

                <p>
                  Your order{" "}
                  <b>{successOrderId}</b>{" "}
                  has been placed successfully.
                </p>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* ORDERS */}

      <section className="orders-content">
        <div className="orders-container">

          <div className="orders-heading-row">

            <div>
              <span className="orders-section-label">
                YOUR PURCHASES
              </span>

              <h2>
                {orders.length > 0
                  ? `${orders.length} Order${
                      orders.length > 1 ? "s" : ""
                    }`
                  : "No Orders Yet"}
              </h2>
            </div>

            <Link
              to="/"
              className="orders-shop-btn"
            >
              <FiShoppingBag />
              Continue Shopping
            </Link>

          </div>

          {/* EMPTY ORDERS */}

          {orders.length === 0 ? (
            <div className="orders-empty">

              <div className="orders-empty-icon">
                <FiPackage />
              </div>

              <h3>No orders found</h3>

              <p>
                You haven't placed any orders yet.
                Start shopping and your orders will
                appear here.
              </p>

              <Link
                to="/"
                className="orders-primary-btn"
              >
                <FiShoppingBag />
                Start Shopping
              </Link>

            </div>
          ) : (

            <div className="orders-list">

              {orders.map((order) => {

                const isExpanded =
                  expandedOrder === order.id;

                return (
                  <article
                    className="order-card"
                    key={order.id}
                  >

                    {/* ORDER HEADER */}

                    <div className="order-card-header">

                      <div className="order-main-info">

                        <div className="order-icon">
                          <FiBox />
                        </div>

                        <div>

                          <span className="order-label">
                            ORDER ID
                          </span>

                          <h3>
                            {order.id}
                          </h3>

                          <div className="order-date">

                            <FiCalendar />

                            <span>
                              {formatDate(
                                order.createdAt
                              )}
                            </span>

                            <span className="order-dot">
                              •
                            </span>

                            <span>
                              {formatTime(
                                order.createdAt
                              )}
                            </span>

                          </div>

                        </div>

                      </div>

                      <div
                        className={`order-status ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(
                          order.status
                        )}

                        <span>
                          {order.status || "Placed"}
                        </span>
                      </div>

                    </div>

                    {/* ORDER SUMMARY */}

                    <div className="order-summary-row">

                      <div className="order-summary-item">

                        <span>Items</span>

                        <strong>
                          {order.itemCount ||
                            order.items?.reduce(
                              (total, item) =>
                                total +
                                Number(
                                  item.quantity || 0
                                ),
                              0
                            ) ||
                            0}
                        </strong>

                      </div>

                      <div className="order-summary-item">

                        <span>Payment</span>

                        <strong>
                          {getPaymentLabel(
                            order.paymentMethod
                          )}
                        </strong>

                      </div>

                      <div className="order-summary-item">

                        <span>Total Amount</span>

                        <strong className="order-total">
                          ₹
                          {Number(
                            order.total || 0
                          ).toLocaleString("en-IN")}
                        </strong>

                      </div>

                    </div>

                    {/* PRODUCTS PREVIEW */}

                    <div className="order-products-preview">

                      {(order.items || [])
                        .slice(0, 3)
                        .map((item) => (

                          <div
                            className="order-product-preview"
                            key={`${order.id}-${item.id}`}
                          >

                            <div className="order-product-image">

                              <img
                                src={item.image}
                                alt={item.name}
                              />

                            </div>

                            <div className="order-product-info">

                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                Qty:{" "}
                                {item.quantity || 1}
                              </span>

                            </div>

                            <strong className="order-product-price">
                              ₹
                              {(
                                Number(
                                  item.price || 0
                                ) *
                                Number(
                                  item.quantity || 1
                                )
                              ).toLocaleString("en-IN")}
                            </strong>

                          </div>

                        ))}

                    </div>

                    {/* DETAILS BUTTON */}

                    <button
                      type="button"
                      className="order-details-toggle"
                      onClick={() =>
                        toggleOrder(order.id)
                      }
                    >

                      <span>
                        {isExpanded
                          ? "Hide Order Details"
                          : "View Order Details"}
                      </span>

                      {isExpanded ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}

                    </button>

                    {/* EXPANDED DETAILS */}

                    {isExpanded && (
                      <div className="order-details">

                        {/* ITEMS */}

                        <div className="order-detail-section">

                          <div className="order-detail-title">
                            <FiPackage />
                            <h4>Order Items</h4>
                          </div>

                          <div className="order-detail-items">

                            {(order.items || []).map(
                              (item) => (

                                <div
                                  className="order-detail-product"
                                  key={`${order.id}-detail-${item.id}`}
                                >

                                  <div className="order-detail-product-image">

                                    <img
                                      src={item.image}
                                      alt={item.name}
                                    />

                                  </div>

                                  <div className="order-detail-product-info">

                                    <strong>
                                      {item.name}
                                    </strong>

                                    <span>
                                      {item.unit ||
                                        item.category ||
                                        "Product"}
                                    </span>

                                    <small>
                                      Quantity:{" "}
                                      {item.quantity ||
                                        1}
                                    </small>

                                  </div>

                                  <div className="order-detail-product-price">

                                    <strong>
                                      ₹
                                      {Number(
                                        item.price || 0
                                      ).toLocaleString(
                                        "en-IN"
                                      )}
                                    </strong>

                                    <span>
                                      ×{" "}
                                      {item.quantity ||
                                        1}
                                    </span>

                                  </div>

                                </div>

                              )
                            )}

                          </div>

                        </div>

                        {/* ADDRESS */}

                        <div className="order-detail-columns">

                          <div className="order-detail-section">

                            <div className="order-detail-title">
                              <FiMapPin />
                              <h4>
                                Delivery Address
                              </h4>
                            </div>

                            <div className="order-address">

                              <strong>
                                {order.customer
                                  ?.fullName ||
                                  loggedInUser.name ||
                                  "Customer"}
                              </strong>

                              {order.customer?.phone && (
                                <span>
                                  {order.customer.phone}
                                </span>
                              )}

                              {order.customer?.address && (
                                <span>
                                  {order.customer.address}
                                </span>
                              )}

                              <span>
                                {[
                                  order.customer?.city,
                                  order.customer?.state,
                                  order.customer?.pincode,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>

                            </div>

                          </div>

                          {/* PAYMENT */}

                          <div className="order-detail-section">

                            <div className="order-detail-title">
                              <FiCreditCard />
                              <h4>
                                Payment Details
                              </h4>
                            </div>

                            <div className="order-payment-details">

                              <div>
                                <span>
                                  Payment Method
                                </span>

                                <strong>
                                  {getPaymentLabel(
                                    order.paymentMethod
                                  )}
                                </strong>
                              </div>

                              <div>
                                <span>
                                  Order Status
                                </span>

                                <strong>
                                  {order.status ||
                                    "Placed"}
                                </strong>
                              </div>

                            </div>

                          </div>

                        </div>

                        {/* PRICE */}

                        <div className="order-price-section">

                          <div className="order-detail-title">
                            <FiCreditCard />
                            <h4>
                              Price Details
                            </h4>
                          </div>

                          <div className="order-price-breakdown">

                            <div>
                              <span>
                                Subtotal
                              </span>

                              <strong>
                                ₹
                                {Number(
                                  order.subtotal || 0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Discount
                              </span>

                              <strong>
                                - ₹
                                {Number(
                                  order.discount || 0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Delivery
                              </span>

                              <strong>
                                {Number(
                                  order.deliveryCharge || 0
                                ) === 0
                                  ? "FREE"
                                  : `₹${Number(
                                      order.deliveryCharge
                                    ).toLocaleString(
                                      "en-IN"
                                    )}`}
                              </strong>
                            </div>

                            <div className="order-final-total">

                              <span>
                                Total
                              </span>

                              <strong>
                                ₹
                                {Number(
                                  order.total || 0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>

                            </div>

                          </div>

                        </div>

                      </div>
                    )}

                  </article>
                );
              })}

            </div>
          )}

          {/* BENEFITS */}

          <div className="orders-benefits">

            <div className="orders-benefit">

              <div>
                <FiTruck />
              </div>

              <section>
                <strong>
                  Fast Delivery
                </strong>

                <span>
                  Quick & reliable delivery
                </span>
              </section>

            </div>

            <div className="orders-benefit">

              <div>
                <FiUser />
              </div>

              <section>
                <strong>
                  Customer Support
                </strong>

                <span>
                  We're here to help
                </span>
              </section>

            </div>

            <div className="orders-benefit">

              <div>
                <FiCheckCircle />
              </div>

              <section>
                <strong>
                  Secure Shopping
                </strong>

                <span>
                  Safe & trusted checkout
                </span>
              </section>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default MyOrders;