const products = [
  // =========================
  // GROCERY PRODUCTS
  // =========================

  {
    id: 1,
    name: "Premium Basmati Rice",
    category: "Grocery",
    subCategory: "Staples",
    price: 499,
    oldPrice: 599,
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    unit: "5 kg",
    stock: 50,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    description:
      "Premium quality basmati rice with long grains, rich aroma and excellent taste.",
  },

  {
    id: 2,
    name: "Fortune Sunflower Oil",
    category: "Grocery",
    subCategory: "Cooking Oil",
    price: 149,
    oldPrice: 175,
    rating: 4.6,
    reviews: 98,
    badge: "20% OFF",
    unit: "1 L",
    stock: 80,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    description:
      "Light and healthy sunflower cooking oil suitable for everyday cooking.",
  },

  {
    id: 3,
    name: "Aashirvaad Atta",
    category: "Grocery",
    subCategory: "Flour",
    price: 279,
    oldPrice: 315,
    rating: 4.7,
    reviews: 156,
    badge: "Popular",
    unit: "5 kg",
    stock: 65,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    description:
      "Whole wheat flour made from quality wheat for soft and delicious rotis.",
  },

  {
    id: 4,
    name: "Tata Salt",
    category: "Grocery",
    subCategory: "Food Essentials",
    price: 28,
    oldPrice: 32,
    rating: 4.8,
    reviews: 210,
    badge: "Top Rated",
    unit: "1 kg",
    stock: 120,
    image:
      "https://images.unsplash.com/photo-1518110925495-5fe2d2f5d6b0?auto=format&fit=crop&w=800&q=80",
    description:
      "Iodized salt for everyday cooking and balanced meals.",
  },

  {
    id: 5,
    name: "Tata Tea Gold",
    category: "Grocery",
    subCategory: "Beverages",
    price: 245,
    oldPrice: 280,
    rating: 4.7,
    reviews: 187,
    badge: "Hot Deal",
    unit: "500 g",
    stock: 70,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    description:
      "Rich and refreshing tea blend perfect for your everyday cup of tea.",
  },

  {
    id: 6,
    name: "Tata Sampann Toor Dal",
    category: "Grocery",
    subCategory: "Pulses",
    price: 159,
    oldPrice: 185,
    rating: 4.6,
    reviews: 76,
    badge: "Deal",
    unit: "1 kg",
    stock: 55,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    description:
      "High-quality toor dal with rich taste and everyday nutrition.",
  },

  {
    id: 7,
    name: "India Gate Basmati Rice",
    category: "Grocery",
    subCategory: "Staples",
    price: 699,
    oldPrice: 799,
    rating: 4.9,
    reviews: 245,
    badge: "Premium",
    unit: "5 kg",
    stock: 35,
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80",
    description:
      "Premium basmati rice with extra-long grains and authentic aroma.",
  },

  {
    id: 8,
    name: "Kissan Mixed Fruit Jam",
    category: "Grocery",
    subCategory: "Breakfast",
    price: 125,
    oldPrice: 145,
    rating: 4.5,
    reviews: 63,
    badge: "New",
    unit: "500 g",
    stock: 40,
    image:
      "https://images.unsplash.com/photo-1589135233689-9c5f7c7e9c4f?auto=format&fit=crop&w=800&q=80",
    description:
      "Delicious mixed fruit jam made for breakfast and snacks.",
  },

  // =========================
  // HOME & KITCHEN
  // =========================

  {
    id: 101,
    name: "Stainless Steel Cookware Set",
    category: "Home & Kitchen",
    subCategory: "Cookware",
    price: 1499,
    oldPrice: 1999,
    rating: 4.8,
    reviews: 142,
    badge: "Best Seller",
    unit: "Set of 5",
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    description:
      "Durable stainless steel cookware set for modern everyday kitchens.",
  },

  {
    id: 102,
    name: "Non-Stick Frying Pan",
    category: "Home & Kitchen",
    subCategory: "Cookware",
    price: 699,
    oldPrice: 899,
    rating: 4.7,
    reviews: 89,
    badge: "30% OFF",
    unit: "26 cm",
    stock: 42,
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80",
    description:
      "Premium non-stick frying pan with comfortable handle and easy cleaning.",
  },

  {
    id: 103,
    name: "Premium Kitchen Knife Set",
    category: "Home & Kitchen",
    subCategory: "Kitchen Tools",
    price: 549,
    oldPrice: 749,
    rating: 4.6,
    reviews: 71,
    badge: "Popular",
    unit: "Set of 3",
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=800&q=80",
    description:
      "Sharp and durable kitchen knives designed for everyday food preparation.",
  },

  {
    id: 104,
    name: "Airtight Storage Container Set",
    category: "Home & Kitchen",
    subCategory: "Storage",
    price: 799,
    oldPrice: 1099,
    rating: 4.8,
    reviews: 116,
    badge: "Hot Deal",
    unit: "Set of 6",
    stock: 48,
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    description:
      "Airtight food storage containers to keep your kitchen organized and fresh.",
  },

  {
    id: 105,
    name: "Electric Kettle",
    category: "Home & Kitchen",
    subCategory: "Appliances",
    price: 899,
    oldPrice: 1199,
    rating: 4.7,
    reviews: 93,
    badge: "Deal",
    unit: "1.5 L",
    stock: 28,
    image:
      "https://images.unsplash.com/photo-1594213114663-d94db9b171e4?auto=format&fit=crop&w=800&q=80",
    description:
      "Fast-boiling electric kettle for tea, coffee and hot water.",
  },

  {
    id: 106,
    name: "Microfiber Kitchen Towels",
    category: "Home & Kitchen",
    subCategory: "Kitchen Essentials",
    price: 249,
    oldPrice: 349,
    rating: 4.5,
    reviews: 54,
    badge: "Value Pack",
    unit: "Pack of 6",
    stock: 75,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    description:
      "Highly absorbent microfiber towels for everyday kitchen cleaning.",
  },

  {
    id: 107,
    name: "Glass Water Bottle",
    category: "Home & Kitchen",
    subCategory: "Drinkware",
    price: 399,
    oldPrice: 499,
    rating: 4.6,
    reviews: 68,
    badge: "Eco Choice",
    unit: "1 L",
    stock: 45,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    description:
      "Reusable glass water bottle with a stylish and practical design.",
  },

  {
    id: 108,
    name: "Kitchen Organizer Rack",
    category: "Home & Kitchen",
    subCategory: "Storage",
    price: 649,
    oldPrice: 899,
    rating: 4.7,
    reviews: 82,
    badge: "New",
    unit: "1 Piece",
    stock: 32,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    description:
      "Compact kitchen organizer rack to keep your everyday essentials neatly arranged.",
  },
];

export { products };

export default products;