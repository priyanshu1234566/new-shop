import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import "../styles/context css/cartcontext.css";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "ghar_sansar_mart_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(
        CART_STORAGE_KEY
      );

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];
    } catch (error) {
      console.error("Cart loading error:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Cart saving error:", error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product || product.id === undefined) {
      return;
    }

    const qty = Math.max(
      1,
      Number(quantity) || 1
    );

    setCartItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + qty,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) - 1,
              }
            : item
        )
        .filter(
          (item) => Number(item.quantity) > 0
        )
    );
  };

  const updateQuantity = (productId, quantity) => {
  const qty = Math.floor(Number(quantity));

  if (!Number.isFinite(qty)) {
    return;
  }

  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }

  setCartItems((currentItems) =>
    currentItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: qty,
          }
        : item
    )
  );
};
  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId) => {
    return cartItems.some(
      (item) => item.id === productId
    );
  };

  const getCartQuantity = (productId) => {
    const product = cartItems.find(
      (item) => item.id === productId
    );

    return product
      ? Number(product.quantity || 0)
      : 0;
  };

  const cartItemCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const cartSubtotal = cartItems.reduce(
    (total, item) => {
      const price = Number(item.price) || 0;
      const quantity =
        Number(item.quantity) || 0;

      return total + price * quantity;
    },
    0
  );

  const cartOriginalTotal =
    cartItems.reduce(
      (total, item) => {
        const price =
          Number(
            item.oldPrice ?? item.price
          ) || 0;

        const quantity =
          Number(item.quantity) || 0;

        return total + price * quantity;
      },
      0
    );

  const cartDiscount = Math.max(
    0,
    cartOriginalTotal - cartSubtotal
  );

  const deliveryCharge =
    cartItems.length === 0
      ? 0
      : cartSubtotal >= 499
      ? 0
      : 40;

  const cartTotal =
    cartSubtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        cartSubtotal,
        cartOriginalTotal,
        cartDiscount,
        deliveryCharge,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        isInCart,
        getCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

  


// Custom cart hook
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export default CartContext;