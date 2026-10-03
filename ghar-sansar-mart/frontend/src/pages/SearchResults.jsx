import { useMemo, useState } from "react";
import "../styles/pages css/searchresults.css";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiSliders,
  FiGrid,
  FiList,
  FiChevronDown,
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const categoryList = [
      ...new Set(
        products
          .filter((product) => product?.category)
          .map((product) => product.category)
      ),
    ];

    return ["All", ...categoryList];
  }, []);

  const searchResults = useMemo(() => {
    const searchText = query.toLowerCase();

    let result = products.filter((product) => {
      if (!product) return false;

      const searchableText = [
        product.name,
        product.category,
        product.subCategory,
        product.description,
        product.badge,
        product.unit,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchText || searchableText.includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        result = [...result].sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        break;

      case "price-high":
        result = [...result].sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
        break;

      case "rating":
        result = [...result].sort(
          (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
        );
        break;

      case "newest":
        result = [...result].reverse();
        break;

      default:
        break;
    }

    return result;
  }, [query, selectedCategory, sortBy]);

  return (
    <main className="search-results-page">
      {/* HERO */}
      <section className="search-results-hero">
        <div className="search-results-container">
          <div className="search-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Search</span>
          </div>

          <div className="search-hero-content">
            <div className="search-hero-icon">
              <FiSearch />
            </div>

            <div>
              <span className="section-eyebrow">PRODUCT SEARCH</span>

              <h1>
                Search Results
                {query && (
                  <>
                    {" "}
                    for <span>"{query}"</span>
                  </>
                )}
              </h1>

              <p>
                Find the products you need for your home, kitchen and
                everyday essentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="search-results-section">
        <div className="search-results-container">
          {/* SEARCH SUMMARY */}
          <div className="search-summary">
            <div>
              <span className="search-result-count">
                {searchResults.length}
              </span>

              <span className="search-result-text">
                {searchResults.length === 1
                  ? " product found"
                  : " products found"}
              </span>

              {query && (
                <span className="search-query-label">
                  for "{query}"
                </span>
              )}
            </div>

            <Link to="/grocery" className="browse-all-link">
              Browse all products
              <FiArrowRight />
            </Link>
          </div>

          {/* FILTER BAR */}
          <div className="search-filter-bar">
            <div className="search-filter-left">
              <div className="filter-title">
                <FiSliders />
                <span>Filter by:</span>
              </div>

              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      selectedCategory === category
                        ? "active"
                        : ""
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="search-filter-right">
              <div className="sort-wrapper">
                <span>Sort:</span>

                <div className="sort-select">
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                    aria-label="Sort search results"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">
                      Price: Low to High
                    </option>
                    <option value="price-high">
                      Price: High to Low
                    </option>
                    <option value="rating">Top Rated</option>
                  </select>

                  <FiChevronDown />
                </div>
              </div>

              <div className="view-switcher">
                <button
                  type="button"
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <FiGrid />
                </button>

                <button
                  type="button"
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          {searchResults.length > 0 ? (
            <div
              className={`search-products-grid ${
                viewMode === "list"
                  ? "list-view"
                  : "grid-view"
              }`}
            >
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="search-empty-state">
              <div className="empty-search-icon">
                <FiSearch />
              </div>

              <h2>No products found</h2>

              <p>
                We couldn't find any products matching
                {query ? ` "${query}"` : " your search"}.
                Try searching with a different keyword.
              </p>

              <div className="empty-search-suggestions">
                <span>Try searching for:</span>

                <div>
                  <Link to="/search?q=rice">Rice</Link>
                  <Link to="/search?q=kitchen">Kitchen</Link>
                  <Link to="/search?q=oil">Oil</Link>
                  <Link to="/search?q=container">
                    Containers
                  </Link>
                </div>
              </div>

              <Link to="/grocery" className="empty-search-button">
                <FiPackage />
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="search-bottom-cta">
        <div className="search-results-container">
          <div className="search-cta-content">
            <div>
              <span className="section-eyebrow">
                GHAR SANSAR MART
              </span>

              <h2>
                Everything your home needs,
                <span> in one place.</span>
              </h2>

              <p>
                Explore our complete collection of grocery and
                home & kitchen essentials.
              </p>
            </div>

            <div className="search-cta-buttons">
              <Link to="/grocery">
                Shop Grocery
                <FiArrowRight />
              </Link>

              <Link to="/home-kitchen">
                Home & Kitchen
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SearchResults;