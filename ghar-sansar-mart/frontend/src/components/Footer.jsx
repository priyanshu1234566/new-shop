import { Link } from "react-router-dom";
import "../styles/components css/footer.css";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
} from "react-icons/fi";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">

          {/* Brand */}
          <div className="footer-column footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">
                GS
              </span>

              <span>
                <strong>Ghar Sansar</strong>
                <small>Mart</small>
              </span>
            </Link>

            <p className="footer-description">
              Your trusted destination for
              quality grocery, home and kitchen
              essentials at everyday prices.
            </p>

            {/* Social Links */}
            <div className="footer-socials">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>

            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/grocery">
                  Grocery
                </Link>
              </li>

              <li>
                <Link to="/home-kitchen">
                  Home & Kitchen
                </Link>
              </li>

              <li>
                <Link to="/wishlist">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/cart">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="footer-column">
            <h3>Customer Support</h3>

            <ul>
              <li>
                <Link to="/my-orders">
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/shipping">
                  Shipping Information
                </Link>
              </li>

              <li>
                <Link to="/returns">
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link to="/faq">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-column">
            <h3>Categories</h3>

            <ul>
              <li>
                <Link to="/grocery">
                  Daily Grocery
                </Link>
              </li>

              <li>
                <Link to="/grocery">
                  Food Essentials
                </Link>
              </li>

              <li>
                <Link to="/home-kitchen">
                  Kitchen Essentials
                </Link>
              </li>

              <li>
                <Link to="/home-kitchen">
                  Home Essentials
                </Link>
              </li>

              <li>
                <Link to="/home-kitchen">
                  Cleaning Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column footer-contact">
            <h3>Get In Touch</h3>

            <div className="contact-item">
              <FiMapPin />

              <span>
                India
              </span>
            </div>

            <div className="contact-item">
              <FiPhone />

              <a href="tel:+919999999999">
                +91 99999 99999
              </a>
            </div>

            <div className="contact-item">
              <FiMail />

              <a href="mailto:support@gharsansarmart.com">
                support@gharsansarmart.com
              </a>
            </div>

            <div className="footer-support-box">
              <strong>
                Need Help?
              </strong>

              <span>
                Our support team is here for you.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">

          <p>
            © {new Date().getFullYear()}{" "}
            <strong>
              Ghar Sansar Mart
            </strong>
            . All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>
          </div>

          <button
            type="button"
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </button>

        </div>
      </div>

    </footer>
  );
}

export default Footer;