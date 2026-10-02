import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFilter,
  FiChevronDown,
  FiGrid,
  FiList,
  FiArrowRight,
  FiShoppingCart,
} from "react-icons/fi";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function Grocery() {
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [viewMode, setViewMode] = useState("grid");

  const groceryProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category === "Grocery"
    );
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        groceryProducts.map(
          (product) => product.subCategory
        )
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [groceryProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...groceryProducts];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.subCategory ===
          selectedCategory
      );
    }

    // Sorting
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
    groceryProducts,
    selectedCategory,
    sortBy,
  ]);

  return (
    <main className="category-page grocery-page">

      {/* Hero */}
      <section className="category-hero">
        <div className="category-hero-container">

          <div className="category-hero-content">
            <span className="category-hero-label">
              <FiShoppingCart />
              Daily Essentials
            </span>

            <h1>
              Fresh Grocery
              <br />
              For Every Home
            </h1>

            <p>
              Discover quality grocery essentials
              at great prices. Everything you need
              for your everyday kitchen.
            </p>

            <div className="category-hero-actions">
              <a
                href="#grocery-products"
                className="primary-button"
              >
                Shop Grocery
                <FiArrowRight />
              </a>

              <Link
                to="/home-kitchen"
                className="secondary-button"
              >
                Explore Home & Kitchen
              </Link>
            </div>
          </div>

          <div className="category-hero-decoration">
            <span className="hero-circle hero-circle-one" />
            <span className="hero-circle hero-circle-two" />

            <div className="hero-shopping-basket">
              <FiShoppingCart  />
            </div>
          </div>

        </div>
      </section>

      {/* Breadcrumb */}
      <div className="page-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Grocery</span>
        </div>
      </div>

      {/* Category Chips */}
      <section className="grocery-categories">
        <div className="page-container">

          <div className="section-heading-row">
            <div>
              <span className="section-label">
                Browse Categories
              </span>

              <h2>
                Grocery Essentials
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
        id="grocery-products"
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

              {/* View */}
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

              {/* Sort */}
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
              <FiShoppingCart />

              <h3>
                No products found
              </h3>

              <p>
                Try selecting another
                grocery category.
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
              Complete Your Home
            </span>

            <h2>
              Looking for Home & Kitchen
              Essentials?
            </h2>

            <p>
              Explore our collection of useful
              products for your kitchen and home.
            </p>

            <Link
              to="/home-kitchen"
              className="primary-button"
            >
              Explore Home & Kitchen
              <FiArrowRight />
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Grocery;