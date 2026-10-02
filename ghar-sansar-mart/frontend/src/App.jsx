import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Grocery from "./pages/Grocery";
import HomeKitchen from "./pages/HomeKitchen";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Categories */}
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/home-kitchen" element={<HomeKitchen />} />

          {/* Product */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Search */}
          <Route path="/search" element={<SearchResults />} />

          {/* Shopping */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Orders */}
          <Route path="/orders" element={<MyOrders />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="not-found-page">
                <div className="not-found-content">
                  <span className="not-found-number">404</span>

                  <h1>Page Not Found</h1>

                  <p>
                    The page you're looking for doesn't exist or has been
                    moved.
                  </p>

                  <a href="/" className="not-found-btn">
                    Back to Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;