import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function CategoryCard({
  category,
  title,
  description,
  image,
  icon,
  link = "#",
  color = "blue",
}) {
  return (
    <Link
      to={link}
      className={`category-card category-${color}`}
    >
      <div className="category-card-content">
        {/* Icon */}
        {icon && (
          <div className="category-icon">
            {icon}
          </div>
        )}

        {/* Text */}
        <div className="category-text">
          {category && (
            <span className="category-label">
              {category}
            </span>
          )}

          <h3>{title}</h3>

          {description && (
            <p>{description}</p>
          )}

          <span className="category-link">
            Shop Now
            <FiArrowRight />
          </span>
        </div>
      </div>

      {/* Image */}
      {image && (
        <div className="category-card-image">
          <img
            src={image}
            alt={title || "Category"}
            loading="lazy"
          />
        </div>
      )}

      {/* Decorative Circle */}
      <span className="category-decoration" />
    </Link>
  );
}

export default CategoryCard;