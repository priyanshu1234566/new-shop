import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [categoryOpen, setCategoryOpen] =
    useState(false);

  const navigate = useNavigate();

  const { cartItemCount } = useCart();

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(query)}`
    );

    setSearchTerm("");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setCategoryOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link
  to="/"
  className="navbar-logo"
  onClick={closeMobileMenu}
>
  <img
    src={logo}
    alt="Ghar Sansar Mart"
    className="navbar-logo-image"
  />
</Link>

        {/* Search */}
        <form
          className="navbar-search"
          onSubmit={handleSearch}
        >
          <FiSearch className="search-icon" />

          <input
            type="search"
            placeholder="Search products, categories..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            aria-label="Search products"
          />

          <button type="submit">
            Search
          </button>
        </form>

        {/* Desktop Navigation */}
        <nav className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <div
            className="navbar-dropdown"
            onMouseEnter={() =>
              setCategoryOpen(true)
            }
            onMouseLeave={() =>
              setCategoryOpen(false)
            }
          >
            <button
              type="button"
              className="category-menu-button"
              onClick={() =>
                setCategoryOpen(
                  (current) => !current
                )
              }
            >
              Categories
              <FiChevronDown />
            </button>

            {categoryOpen && (
              <div className="category-dropdown">
                <Link
                  to="/grocery"
                  onClick={() =>
                    setCategoryOpen(false)
                  }
                >
                  Grocery
                </Link>

                <Link
                  to="/home-kitchen"
                  onClick={() =>
                    setCategoryOpen(false)
                  }
                >
                  Home & Kitchen
                </Link>

                <Link
                  to="/grocery?category=food"
                  onClick={() =>
                    setCategoryOpen(false)
                  }
                >
                  Food & Essentials
                </Link>

                <Link
                  to="/home-kitchen?category=cleaning"
                  onClick={() =>
                    setCategoryOpen(false)
                  }
                >
                  Cleaning
                </Link>
              </div>
            )}
          </div>

          <Link to="/grocery">
            Grocery
          </Link>

          <Link to="/home-kitchen">
            Home & Kitchen
          </Link>
        </nav>

        {/* Actions */}
        <div className="navbar-actions">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="navbar-action"
            aria-label="Wishlist"
          >
            <FiHeart />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="navbar-action cart-action"
            aria-label="Shopping cart"
          >
            <FiShoppingCart />

            {cartItemCount > 0 && (
              <span className="cart-count">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            to="/login"
            className="navbar-account"
          >
            <FiUser />

            <span>Login</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMobileMenuOpen(
                (current) => !current
              )
            }
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX />
            ) : (
              <FiMenu />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-navbar">
          <form
            className="mobile-search"
            onSubmit={handleSearch}
          >
            <FiSearch />

            <input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

            <button type="submit">
              Search
            </button>
          </form>

          <nav className="mobile-nav-links">
            <Link
              to="/"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() =>
                setCategoryOpen(
                  (current) => !current
                )
              }
            >
              Categories
              <FiChevronDown />
            </button>

            {categoryOpen && (
              <div className="mobile-category-links">
                <Link
                  to="/grocery"
                  onClick={closeMobileMenu}
                >
                  Grocery
                </Link>

                <Link
                  to="/home-kitchen"
                  onClick={closeMobileMenu}
                >
                  Home & Kitchen
                </Link>
              </div>
            )}

            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
            >
              <FiHeart />
              Wishlist
            </Link>

            <Link
              to="/cart"
              onClick={closeMobileMenu}
            >
              <FiShoppingCart />
              Cart

              {cartItemCount > 0 && (
                <span className="mobile-cart-count">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link
              to="/login"
              onClick={closeMobileMenu}
            >
              <FiUser />
              Login / Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;