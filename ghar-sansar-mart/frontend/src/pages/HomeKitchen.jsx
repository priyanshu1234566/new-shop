import { useMemo, useState } from "react";
import "../styles/pages css/homekitchen.css";

import { Link } from "react-router-dom";
import {
  FiFilter,
  FiChevronDown,
  FiGrid,
  FiList,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function HomeKitchen() {
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [viewMode, setViewMode] = useState("grid");

  const homeKitchenProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category === "Home & Kitchen"
    );
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        homeKitchenProducts.map(
          (product) => product.subCategory
        )
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [homeKitchenProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...homeKitchenProducts];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.subCategory ===
          selectedCategory
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        result.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "newest":
        result.sort(
          (a, b) => b.id - a.id
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    homeKitchenProducts,
    selectedCategory,
    sortBy,
  ]);

  return (
    <main className="category-page home-kitchen-page">

      {/* Hero */}
      <section className="category-hero">
        <div className="category-hero-container">

          <div className="category-hero-content">
            <span className="category-hero-label">
              <FiHome />
              Home Essentials
            </span>

            <h1>
              Make Your Home
              <br />
              Better Every Day
            </h1>

            <p>
              Discover smart, useful and stylish
              products for your kitchen and home.
            </p>

            <div className="category-hero-actions">
              <a
                href="#home-kitchen-products"
                className="primary-button"
              >
                Explore Products
                <FiArrowRight />
              </a>

              <Link
                to="/grocery"
                className="secondary-button"
              >
                Shop Grocery
              </Link>
            </div>
          </div>

          <div className="category-hero-decoration">
            <span className="hero-circle hero-circle-one" />
            <span className="hero-circle hero-circle-two" />

            <div className="hero-shopping-basket">
              <FiHome />
            </div>
          </div>

        </div>
      </section>

      {/* Breadcrumb */}
      <div className="page-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Home & Kitchen</span>
        </div>
      </div>

      {/* Categories */}
      <section className="grocery-categories">
        <div className="page-container">

          <div className="section-heading-row">
            <div>
              <span className="section-label">
                Browse Categories
              </span>

              <h2>
                Home & Kitchen Essentials
              </h2>
            </div>

            <span className="product-count">
              {filteredProducts.length} Products
            </span>
          </div>

          <div className="category-filter-list">
            {categories.map(
              (category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    selectedCategory ===
                    category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}
          </div>

        </div>
      </section>

      {/* Products */}
      <section
        className="products-listing"
        id="home-kitchen-products"
      >
        <div className="page-container">

          {/* Toolbar */}
          <div className="products-toolbar">

            <div className="toolbar-left">
              <button
                type="button"
                className="filter-button"
              >
                <FiFilter />
                Filters
              </button>

              <span>
                Showing{" "}
                <strong>
                  {filteredProducts.length}
                </strong>{" "}
                products
              </span>
            </div>

            <div className="toolbar-right">

              <div className="view-buttons">
                <button
                  type="button"
                  className={
                    viewMode === "grid"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setViewMode("grid")
                  }
                  aria-label="Grid view"
                >
                  <FiGrid />
                </button>

                <button
                  type="button"
                  className={
                    viewMode === "list"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setViewMode("list")
                  }
                  aria-label="List view"
                >
                  <FiList />
                </button>
              </div>

              <div className="sort-select">
                <FiChevronDown />

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value
                    )
                  }
                  aria-label="Sort products"
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="newest">
                    Newest
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Customer Rating
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={`products-grid ${
                viewMode === "list"
                  ? "list-view"
                  : ""
              }`}
            >
              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}
            </div>
          ) : (
            <div className="empty-products">
              <FiHome />

              <h3>
                No products found
              </h3>

              <p>
                Try selecting another
                category.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    "All"
                  )
                }
              >
                View All Products
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="category-bottom-cta">
        <div className="page-container">

          <div className="bottom-cta-content">
            <span>
              Complete Your Shopping
            </span>

            <h2>
              Need Your Daily Grocery?
            </h2>

            <p>
              Get all your everyday grocery
              essentials in one place.
            </p>

            <Link
              to="/grocery"
              className="primary-button"
            >
              Shop Grocery
              <FiArrowRight />
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}

export default HomeKitchen;