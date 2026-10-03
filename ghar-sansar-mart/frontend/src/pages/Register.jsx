import { useState } from "react";
import "../styles/pages css/register.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiCheck,
  FiHome,
  FiUserPlus,
} from "react-icons/fi";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    setRegisterError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Enter a valid name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    if (!formData.terms) {
      newErrors.terms =
        "Please accept the terms and conditions";
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
    setRegisterError("");

    setTimeout(() => {
      try {
        const existingUser = localStorage.getItem(
          "ghar_sansar_mart_user"
        );

        if (existingUser) {
          const parsedUser = JSON.parse(existingUser);

          if (
            parsedUser.email?.toLowerCase() ===
            formData.email.trim().toLowerCase()
          ) {
            setRegisterError(
              "An account with this email already exists. Please login."
            );

            setIsLoading(false);
            return;
          }
        }

        const newUser = {
          id: `USR${Date.now()}`,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          password: formData.password,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem(
          "ghar_sansar_mart_user",
          JSON.stringify(newUser)
        );

        localStorage.setItem(
          "ghar_sansar_mart_registered",
          "true"
        );

        navigate("/login", {
          replace: true,
          state: {
            registered: true,
          },
        });
      } catch (error) {
        console.error("Registration error:", error);

        setRegisterError(
          "Something went wrong. Please try again."
        );

        setIsLoading(false);
      }
    }, 700);
  };

  return (
    <main className="register-page">
      <section className="register-section">
        <div className="register-container">
          {/* LEFT SHOWCASE */}
          <div className="register-showcase">
            <Link
              to="/"
              className="register-brand"
            >
              <span className="register-brand-icon">
                GS
              </span>

              <span>
                <strong>Ghar Sansar</strong>
                <small>Mart</small>
              </span>
            </Link>

            <div className="register-showcase-content">
              <span className="section-eyebrow">
                JOIN GHAR SANSAR MART
              </span>

              <h1>
                Your everyday shopping,
                <span> made simpler.</span>
              </h1>

              <p>
                Create your account and enjoy a smoother
                shopping experience with easy checkout,
                order tracking and saved favorites.
              </p>

              <div className="register-benefits">
                <div>
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Easy Shopping</strong>
                    <small>
                      Browse grocery and home essentials
                      easily.
                    </small>
                  </div>
                </div>

                <div>
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Track Orders</strong>
                    <small>
                      Keep track of your orders and
                      deliveries.
                    </small>
                  </div>
                </div>

                <div>
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Save Favorites</strong>
                    <small>
                      Create your personal wishlist.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="register-showcase-footer">
              <FiShield />

              <span>
                Secure & simple account creation
              </span>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="register-form-area">
            <div className="register-form-card">
              <div className="register-form-header">
                <div className="register-mobile-icon">
                  <FiUserPlus />
                </div>

                <span className="section-eyebrow">
                  CREATE ACCOUNT
                </span>

                <h2>Let's Get Started</h2>

                <p>
                  Create your Ghar Sansar Mart account.
                </p>
              </div>

              {registerError && (
                <div className="register-error-box">
                  <FiShield />
                  <span>{registerError}</span>
                </div>
              )}

              <form
                className="register-form"
                onSubmit={handleSubmit}
              >
                {/* NAME */}
                <div className="register-field">
                  <label htmlFor="name">
                    Full Name
                  </label>

                  <div
                    className={`register-input ${
                      errors.name ? "has-error" : ""
                    }`}
                  >
                    <FiUser />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>

                  {errors.name && (
                    <small className="register-field-error">
                      {errors.name}
                    </small>
                  )}
                </div>

                {/* EMAIL + PHONE */}
                <div className="register-two-columns">
                  <div className="register-field">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <div
                      className={`register-input ${
                        errors.email ? "has-error" : ""
                      }`}
                    >
                      <FiMail />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>

                    {errors.email && (
                      <small className="register-field-error">
                        {errors.email}
                      </small>
                    )}
                  </div>

                  <div className="register-field">
                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <div
                      className={`register-input ${
                        errors.phone ? "has-error" : ""
                      }`}
                    >
                      <FiPhone />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength="10"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>

                    {errors.phone && (
                      <small className="register-field-error">
                        {errors.phone}
                      </small>
                    )}
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="register-field">
                  <label htmlFor="password">
                    Password
                  </label>

                  <div
                    className={`register-input ${
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
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="register-password-toggle"
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
                    <small className="register-field-error">
                      {errors.password}
                    </small>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="register-field">
                  <label htmlFor="confirmPassword">
                    Confirm Password
                  </label>

                  <div
                    className={`register-input ${
                      errors.confirmPassword
                        ? "has-error"
                        : ""
                    }`}
                  >
                    <FiLock />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="register-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <small className="register-field-error">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>

                {/* TERMS */}
                <div className="register-terms">
                  <label>
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                    />

                    <span className="register-custom-checkbox">
                      <FiCheck />
                    </span>

                    <span>
                      I agree to the{" "}
                      <Link to="/terms">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {errors.terms && (
                    <small className="register-field-error">
                      {errors.terms}
                    </small>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="register-submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="register-spinner" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* LOGIN */}
              <div className="register-login">
                <span>
                  Already have an account?
                </span>

                <Link to="/login">
                  Sign In
                  <FiArrowRight />
                </Link>
              </div>

              {/* HOME */}
              <Link
                to="/"
                className="register-home-link"
              >
                <FiHome />
                Back to Ghar Sansar Mart
              </Link>
            </div>

            {/* SECURITY */}
            <div className="register-security">
              <div>
                <FiShield />
              </div>

              <div>
                <strong>Your information is secure</strong>

                <span>
                  We keep your account information private
                  and protected.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;