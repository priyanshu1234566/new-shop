import { Link } from "react-router-dom";
import "../styles/home.css";
import {
  FiArrowRight,
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiRefreshCw,
  FiStar,
  FiHeart,
  FiChevronRight,
  FiPercent,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaShoppingBasket,
  FaHome,
  FaUtensils,
  FaSprayCan,
} from "react-icons/fa";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function Home() {
  
  /*
   * ----------------------------------------------------
   * PRODUCT DATA
   * ----------------------------------------------------
   */

  const allProducts = Array.isArray(products)
    ? products
    : [];

  

  /*
   * Featured:
   * First 8 products
   */

  const featuredProducts = allProducts.slice(0, 8);

  /*
   * Deals:
   * Products having badge / oldPrice
   */

  const dealProducts = allProducts
    .filter(
      (product) =>
        product.badge ||
        Number(product.oldPrice) > Number(product.price)
    )
    .slice(0, 4);

  /*
   * New arrivals:
   * Last products from current demo data
   */

  const newProducts = [...allProducts]
    .reverse()
    .slice(0, 4);

  /*
   * ----------------------------------------------------
   * ADD TO CART
   * ----------------------------------------------------
   */

 

  return (
    <main className="home-page">

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="hero-section">

        <div className="hero-container">

          {/* LEFT CONTENT */}

          <div className="hero-content">

            <div className="hero-top-badge">
              <span className="hero-badge-dot"></span>

              Trusted Everyday Shopping
            </div>

            <h1 className="hero-title">

              Har Ghar Ki Zaroorat,

              <span>
                Ek Hi Jagah
              </span>

            </h1>

            <p className="hero-description">

              Grocery se lekar Home & Kitchen
              essentials tak — quality products,
              affordable prices aur reliable
              shopping experience.

            </p>

            <div className="hero-actions">

              <Link
                to="/grocery"
                className="hero-primary-btn"
              >
                <span>Shop Grocery</span>

                <FiArrowRight />
              </Link>

              <Link
                to="/home-kitchen"
                className="hero-secondary-btn"
              >
                Explore Home & Kitchen
              </Link>

            </div>

            {/* TRUST POINTS */}

            <div className="hero-trust-points">

              <div className="hero-trust-item">

                <FiCheckCircle />

                <span>
                  Quality Products
                </span>

              </div>

              <div className="hero-trust-item">

                <FiCheckCircle />

                <span>
                  Easy Shopping
                </span>

              </div>

              <div className="hero-trust-item">

                <FiCheckCircle />

                <span>
                  Fast Delivery
                </span>

              </div>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="hero-visual">

            <div className="hero-main-card">

              <div className="hero-card-header">

                <div>

                  <span>
                    GHAR SANSAR
                  </span>

                  <strong>
                    MART
                  </strong>

                </div>

                <div className="hero-cart-icon">
                  <FiShoppingCart />
                </div>

              </div>


              <div className="hero-shopping-bag">

                <div className="hero-bag-handle"></div>

                <div className="hero-product product-orange">
                  🥫
                </div>

                <div className="hero-product product-green">
                  🥬
                </div>

                <div className="hero-product product-yellow">
                  🧴
                </div>

              </div>


              <div className="hero-card-bottom">

                <div>

                  <span>
                    Everything
                  </span>

                  <strong>
                    Your Home Needs
                  </strong>

                </div>

                <div className="hero-rating">
                  <FiStar />
                  <span>4.9</span>
                </div>

              </div>

            </div>


            {/* FLOATING DELIVERY CARD */}

            <div className="hero-floating-card delivery-card">

              <div className="floating-icon">
                <FiTruck />
              </div>

              <div>

                <strong>
                  Fast Delivery
                </strong>

                <span>
                  Safe & Reliable
                </span>

              </div>

            </div>


            {/* FLOATING OFFER CARD */}

            <div className="hero-floating-card offer-card">

              <div className="offer-percent">
                <FiPercent />
              </div>

              <div>

                <strong>
                  Great Deals
                </strong>

                <span>
                  Every Day
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          SERVICE STRIP
      ================================================= */}

      <section className="service-strip">

        <div className="service-container">

          <div className="service-item">

            <div className="service-icon">
              <FiTruck />
            </div>

            <div>

              <strong>
                Fast Delivery
              </strong>

              <span>
                Quick & reliable delivery
              </span>

            </div>

          </div>


          <div className="service-item">

            <div className="service-icon">
              <FiShield />
            </div>

            <div>

              <strong>
                Quality Assured
              </strong>

              <span>
                Carefully selected products
              </span>

            </div>

          </div>


          <div className="service-item">

            <div className="service-icon">
              <FiRefreshCw />
            </div>

            <div>

              <strong>
                Easy Shopping
              </strong>

              <span>
                Simple & convenient
              </span>

            </div>

          </div>


          <div className="service-item">

            <div className="service-icon">
              <FiHeadphones />
            </div>

            <div>

              <strong>
                Customer Support
              </strong>

              <span>
                We're here to help
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          CATEGORY SECTION
      ================================================= */}

      <section
        className="home-section categories-section"
        id="categories"
      >

        <div className="section-container">

          <div className="section-header">

            <div>

              <span className="section-eyebrow">
                SHOP BY CATEGORY
              </span>

              <h2>
                Everything Your Home Needs
              </h2>

              <p>
                Daily essentials aur household
                products ek hi jagah.
              </p>

            </div>

            <Link
              to="/grocery"
              className="section-link"
            >
              View All
              <FiArrowRight />
            </Link>

          </div>


          <div className="category-grid">

            {/* GROCERY */}

            <Link
              to="/grocery"
              className="large-category-card grocery-category"
            >

              <div className="category-content">

                <span className="category-number">
                  01
                </span>

                <div className="category-icon">
                  <FaShoppingBasket />
                </div>

                <h3>
                  Grocery
                </h3>

                <p>
                  Fresh & everyday grocery
                  essentials for your family.
                </p>

                <span className="category-explore">
                  Explore Grocery
                  <FiArrowRight />
                </span>

              </div>

              <div className="category-decoration">
                🛒
              </div>

            </Link>


            {/* HOME & KITCHEN */}

            <Link
              to="/home-kitchen"
              className="large-category-card home-category"
            >

              <div className="category-content">

                <span className="category-number">
                  02
                </span>

                <div className="category-icon">
                  <FaHome />
                </div>

                <h3>
                  Home & Kitchen
                </h3>

                <p>
                  Useful products to make
                  your everyday life easier.
                </p>

                <span className="category-explore">
                  Explore Home & Kitchen
                  <FiArrowRight />
                </span>

              </div>

              <div className="category-decoration">
                🏠
              </div>

            </Link>

          </div>


          {/* SMALL CATEGORY LINKS */}

          <div className="mini-category-grid">

            <Link
              to="/grocery"
              className="mini-category-card"
            >

              <div className="mini-category-icon">
                <FaShoppingBasket />
              </div>

              <div>

                <strong>
                  Daily Grocery
                </strong>

                <span>
                  Everyday essentials
                </span>

              </div>

              <FiChevronRight />

            </Link>


            <Link
              to="/home-kitchen"
              className="mini-category-card"
            >

              <div className="mini-category-icon">
                <FaUtensils />
              </div>

              <div>

                <strong>
                  Kitchen Essentials
                </strong>

                <span>
                  Smart kitchen products
                </span>

              </div>

              <FiChevronRight />

            </Link>


            <Link
              to="/home-kitchen"
              className="mini-category-card"
            >

              <div className="mini-category-icon">
                <FaSprayCan />
              </div>

              <div>

                <strong>
                  Home Care
                </strong>

                <span>
                  Cleaning & care
                </span>

              </div>

              <FiChevronRight />

            </Link>

          </div>

        </div>

      </section>


      {/* =================================================
          FEATURED PRODUCTS
      ================================================= */}

      <section
        className="home-section products-section"
        id="featured"
      >

        <div className="section-container">

          <div className="section-header">

            <div>

              <span className="section-eyebrow">
                FEATURED PRODUCTS
              </span>

              <h2>
                Popular Picks For Your Home
              </h2>

              <p>
                Customer favourites from
                Ghar Sansar Mart.
              </p>

            </div>

            <Link
              to="/grocery"
              className="section-link"
            >
              Shop All
              <FiArrowRight />
            </Link>

          </div>


          {featuredProducts.length > 0 ? (

            <div className="product-grid">

              {featuredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          ) : (

            <div className="empty-products">

              <div>
                🛍️
              </div>

              <h3>
                Products Coming Soon
              </h3>

              <p>
                New products will appear here.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          DEAL BANNER
      ================================================= */}

      <section className="deal-banner-section">

        <div className="section-container">

          <div className="deal-banner">

            <div className="deal-banner-content">

              <div className="deal-label">

                <FiClock />

                LIMITED TIME DEALS

              </div>

              <h2>
                Better Products.
                <span>
                  Better Prices.
                </span>
              </h2>

              <p>
                Selected products par special
                deals ka benefit uthaiye.
              </p>

              <Link
                to="/grocery"
                className="deal-button"
              >
                Shop Deals
                <FiArrowRight />
              </Link>

            </div>


            <div className="deal-banner-visual">

              <div className="deal-circle">
                <FiPercent />
                <strong>
                  DEAL
                </strong>
              </div>

              <div className="deal-small-card">
                🛍️
              </div>

              <div className="deal-small-card second">
                🏠
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          DEAL PRODUCTS
      ================================================= */}

      {dealProducts.length > 0 && (

        <section
          className="home-section deals-products-section"
          id="deals"
        >

          <div className="section-container">

            <div className="section-header">

              <div>

                <span className="section-eyebrow">
                  TODAY'S DEALS
                </span>

                <h2>
                  Special Offers
                </h2>

                <p>
                  Limited time prices on
                  selected products.
                </p>

              </div>

              <Link
                to="/grocery"
                className="section-link"
              >
                View All
                <FiArrowRight />
              </Link>

            </div>


            <div className="product-grid">

              {dealProducts.map((product) => (

                <ProductCard
                  key={`deal-${product.id}`}
                  product={product}
                />

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          NEW ARRIVALS
      ================================================= */}

      {newProducts.length > 0 && (

        <section
          className="home-section new-arrivals-section"
          id="new-arrivals"
        >

          <div className="section-container">

            <div className="section-header">

              <div>

                <span className="section-eyebrow">
                  NEW ARRIVALS
                </span>

                <h2>
                  Freshly Added For You
                </h2>

                <p>
                  Discover our latest products.
                </p>

              </div>

              <Link
                to="/home-kitchen"
                className="section-link"
              >
                Explore More
                <FiArrowRight />
              </Link>

            </div>


            <div className="product-grid">

              {newProducts.map((product) => (

                <ProductCard
                  key={`new-${product.id}`}
                  product={product}
                />

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          WHY GHAR SANSAR MART
      ================================================= */}

      <section className="why-section">

        <div className="section-container">

          <div className="why-layout">

            {/* LEFT */}

            <div className="why-content">

              <span className="section-eyebrow">
                WHY GHAR SANSAR MART
              </span>

              <h2>
                Shopping Made
                <span>
                  Simple & Reliable
                </span>
              </h2>

              <p>
                Humara goal simple hai —
                aapke daily household shopping
                experience ko easy, convenient
                aur trustworthy banana.
              </p>


              <div className="why-list">

                <div className="why-item">

                  <div className="why-icon">
                    <FiShield />
                  </div>

                  <div>

                    <h3>
                      Quality First
                    </h3>

                    <p>
                      Carefully selected products
                      for everyday use.
                    </p>

                  </div>

                </div>


                <div className="why-item">

                  <div className="why-icon">
                    <FiTruck />
                  </div>

                  <div>

                    <h3>
                      Convenient Delivery
                    </h3>

                    <p>
                      Simple ordering with
                      reliable delivery.
                    </p>

                  </div>

                </div>


                <div className="why-item">

                  <div className="why-icon">
                    <FiHeart />
                  </div>

                  <div>

                    <h3>
                      Customer Focused
                    </h3>

                    <p>
                      Your shopping experience
                      matters to us.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT */}

            <div className="why-visual">

              <div className="why-main-card">

                <div className="why-card-top">

                  <div className="why-logo">
                    GS
                  </div>

                  <div>

                    <strong>
                      Ghar Sansar
                    </strong>

                    <span>
                      MART
                    </span>

                  </div>

                </div>


                <div className="why-stat">

                  <strong>
                    100%
                  </strong>

                  <span>
                    Everyday Convenience
                  </span>

                </div>


                <div className="why-rating-row">

                  <div className="stars">

                    <FiStar />
                    <FiStar />
                    <FiStar />
                    <FiStar />
                    <FiStar />

                  </div>

                  <span>
                    Trusted Shopping
                  </span>

                </div>

              </div>

              <div className="why-floating-one">
                🛒
              </div>

              <div className="why-floating-two">
                ✓
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="final-cta-section">

        <div className="section-container">

          <div className="final-cta">

            <div className="final-cta-icon">
              🛒
            </div>

            <div className="final-cta-content">

              <span>
                GHAR SANSAR MART
              </span>

              <h2>
                Ready to Shop?
              </h2>

              <p>
                Apne ghar ki daily needs
                ek hi jagah se explore karein.
              </p>

            </div>

            <Link
              to="/grocery"
              className="final-cta-button"
            >
              Start Shopping
              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;