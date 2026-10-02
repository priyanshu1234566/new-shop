import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiArrowRight,
  FiShield,
  FiUserPlus,
  FiHome,
  FiCheck,
} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const redirectPath = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setLoginError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError("");

    /*
      TEMPORARY FRONTEND LOGIN

      Later this section will be replaced with:
      POST /api/auth/login

      and the backend will verify:
      - email
      - password
      - account status
      - JWT/session
    */

    setTimeout(() => {
      try {
        const registeredUser = JSON.parse(
          localStorage.getItem(
            "ghar_sansar_mart_user"
          )
        );

        if (!registeredUser) {
          setLoginError(
            "No account found. Please create an account first."
          );
          setIsLoading(false);
          return;
        }

        if (
          registeredUser.email.toLowerCase() !==
          formData.email.trim().toLowerCase()
        ) {
          setLoginError(
            "Invalid email or password."
          );
          setIsLoading(false);
          return;
        }

        if (
          registeredUser.password !==
          formData.password
        ) {
          setLoginError(
            "Invalid email or password."
          );
          setIsLoading(false);
          return;
        }

        const loginUser = {
          id: registeredUser.id,
          name: registeredUser.name,
          email: registeredUser.email,
          phone: registeredUser.phone || "",
          loggedInAt: new Date().toISOString(),
        };

        localStorage.setItem(
          "ghar_sansar_mart_logged_in",
          JSON.stringify(loginUser)
        );

        if (formData.remember) {
          localStorage.setItem(
            "ghar_sansar_mart_remember",
            "true"
          );
        } else {
          localStorage.removeItem(
            "ghar_sansar_mart_remember"
          );
        }

        navigate(redirectPath, {
          replace: true,
        });
      } catch (error) {
        console.error("Login error:", error);

        setLoginError(
          "Something went wrong. Please try again."
        );

        setIsLoading(false);
      }
    }, 700);
  };

  return (
    <main className="login-page">
      <section className="login-section">
        <div className="login-container">
          {/* LEFT SIDE */}
          <div className="login-showcase">
            <Link
              to="/"
              className="login-brand"
            >
              <span className="login-brand-icon">
                GS
              </span>

              <span>
                <strong>Ghar Sansar</strong>
                <small>Mart</small>
              </span>
            </Link>

            <div className="login-showcase-content">
              <span className="section-eyebrow">
                WELCOME BACK
              </span>

              <h1>
                Everything your home needs,
                <span> just a login away.</span>
              </h1>

              <p>
                Sign in to manage your orders, save your
                favorite products and enjoy a smoother
                shopping experience.
              </p>

              <div className="login-benefits">
                <div>
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Track Your Orders</strong>
                    <small>
                      Stay updated from order to delivery.
                    </small>
                  </div>
                </div>

                <div>
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Save Your Favorites</strong>
                    <small>
                      Keep your wishlist available anytime.
                    </small>
                  </div>
                </div>

                <div>
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Faster Checkout</strong>
                    <small>
                      Your shopping experience stays simple.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="login-showcase-footer">
              <FiShield />

              <span>
                Secure shopping experience
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="login-form-area">
            <div className="login-form-card">
              <div className="login-form-header">
                <div className="login-mobile-icon">
                  <FiLock />
                </div>

                <span className="section-eyebrow">
                  ACCOUNT LOGIN
                </span>

                <h2>Welcome Back!</h2>

                <p>
                  Sign in to continue to your account.
                </p>
              </div>

              {loginError && (
                <div className="login-error-box">
                  <FiShield />

                  <span>{loginError}</span>
                </div>
              )}

              <form
                className="login-form"
                onSubmit={handleSubmit}
              >
                {/* EMAIL */}
                <div className="login-field">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <div
                    className={`login-input ${
                      errors.email ? "has-error" : ""
                    }`}
                  >
                    <FiMail />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>

                  {errors.email && (
                    <small className="login-field-error">
                      {errors.email}
                    </small>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="login-field">
                  <div className="login-label-row">
                    <label htmlFor="password">
                      Password
                    </label>

                    <Link to="/forgot-password">
                      Forgot Password?
                    </Link>
                  </div>

                  <div
                    className={`login-input ${
                      errors.password ? "has-error" : ""
                    }`}
                  >
                    <FiLock />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <small className="login-field-error">
                      {errors.password}
                    </small>
                  )}
                </div>

                {/* OPTIONS */}
                <div className="login-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />

                    <span className="custom-checkbox">
                      <FiCheck />
                    </span>

                    <span>
                      Remember me
                    </span>
                  </label>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="login-submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="login-spinner" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* REGISTER */}
              <div className="login-register">
                <span>
                  Don't have an account?
                </span>

                <Link to="/register">
                  <FiUserPlus />
                  Create Account
                </Link>
              </div>

              {/* HOME */}
              <Link
                to="/"
                className="login-home-link"
              >
                <FiHome />
                Back to Ghar Sansar Mart
              </Link>
            </div>

            {/* SECURITY */}
            <div className="login-security">
              <div>
                <FiShield />
              </div>

              <div>
                <strong>
                  Your privacy matters
                </strong>

                <span>
                  Your account information is kept
                  secure and private.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;