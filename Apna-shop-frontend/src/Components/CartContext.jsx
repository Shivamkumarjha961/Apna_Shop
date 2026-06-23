// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export function useCart() {
//   return useContext(CartContext);
// }

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   // 🔥 get user
//   const getUser = () => {
//     const user = localStorage.getItem("loggedInUser");
//     return user ? JSON.parse(user) : null;
//   };

//   // 🔥 user-wise keys
//   const getCartKey = () => {
//     const user = getUser();
//     return user ? `cart_${user.id}` : null;
//   };

//   const getWishlistKey = () => {
//     const user = getUser();
//     return user ? `wishlist_${user.id}` : null;
//   };

//   // ✅ Load data (user-wise)
//   const loadUserData = () => {
//     const cartKey = getCartKey();
//     const wishlistKey = getWishlistKey();

//     if (cartKey) {
//       const savedCart = localStorage.getItem(cartKey);
//       setCartItems(savedCart ? JSON.parse(savedCart) : []);
//     } else {
//       setCartItems([]);
//     }

//     if (wishlistKey) {
//       const savedWishlist = localStorage.getItem(wishlistKey);
//       setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
//     } else {
//       setWishlistItems([]);
//     }
//   };

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   // 🔥 listen login/logout
//   useEffect(() => {
//     window.addEventListener("userChanged", loadUserData);
//     return () => {
//       window.removeEventListener("userChanged", loadUserData);
//     };
//   }, []);

//   // ✅ Save cart
//   useEffect(() => {
//     const cartKey = getCartKey();
//     if (cartKey) {
//       localStorage.setItem(cartKey, JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   // ✅ Save wishlist
//   useEffect(() => {
//     const wishlistKey = getWishlistKey();
//     if (wishlistKey) {
//       localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
//     }
//   }, [wishlistItems]);

//   // ✅ Add to Cart
//   const addToCart = (item) => {
//     const user = getUser();

//     if (!user) {
//       alert("⚠️ Please login first!");
//       return;
//     }

//     setCartItems((prev) => {
//       const exists = prev.some(
//         (i) =>
//           i.name === item.name &&
//           i.selectedSize === item.selectedSize
//       );
//       if (exists) return prev;
//       return [...prev, item];
//     });
//   };

//   // ✅ Remove from Cart
//   const removeFromCart = (itemToRemove) => {
//     setCartItems((prev) =>
//       prev.filter(
//         (item) =>
//           !(
//             item.name === itemToRemove.name &&
//             item.selectedSize === itemToRemove.selectedSize
//           )
//       )
//     );
//   };

//   // ✅ Add to Wishlist
//   const addToWishlist = (item) => {
//     const user = getUser();

//     if (!user) {
//       alert("⚠️ Please login first!");
//       return;
//     }

//     setWishlistItems((prev) => {
//       const exists = prev.some((i) => i.name === item.name);
//       if (exists) return prev;
//       return [...prev, item];
//     });
//   };

//   // ✅ Remove from Wishlist
//   const removeFromWishlist = (item) => {
//     setWishlistItems((prev) =>
//       prev.filter((i) => i.name !== item.name)
//     );
//   };

//   // ✅ Check Wishlist
//   const isInWishlist = (item) => {
//     return wishlistItems.some((i) => i.name === item.name);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         wishlistItems,
//         addToCart,
//         addToWishlist,
//         removeFromWishlist,
//         removeFromCart,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }










// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export function useCart() {
//   return useContext(CartContext);
// }

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   const getUser = () => {
//     const user = localStorage.getItem("loggedInUser");
//     return user ? JSON.parse(user) : null;
//   };

//   const getCartKey = () => {
//     const user = getUser();
//     return user ? `cart_${user.id}` : null;
//   };

//   const getWishlistKey = () => {
//     const user = getUser();
//     return user ? `wishlist_${user.id}` : null;
//   };

//   const loadUserData = () => {
//     const cartKey = getCartKey();
//     const wishlistKey = getWishlistKey();

//     setCartItems(
//       cartKey ? JSON.parse(localStorage.getItem(cartKey)) || [] : []
//     );

//     setWishlistItems(
//       wishlistKey ? JSON.parse(localStorage.getItem(wishlistKey)) || [] : []
//     );
//   };

//   useEffect(() => {
//     loadUserData();
//     window.addEventListener("userChanged", loadUserData);
//     return () => window.removeEventListener("userChanged", loadUserData);
//   }, []);

//   useEffect(() => {
//     const cartKey = getCartKey();
//     if (cartKey) localStorage.setItem(cartKey, JSON.stringify(cartItems));
//   }, [cartItems]);

//   useEffect(() => {
//     const wishlistKey = getWishlistKey();
//     if (wishlistKey)
//       localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   // ✅ ADD TO CART
//   const addToCart = (item) => {
//     const user = getUser();

//     if (!user) return alert("⚠️ Please login first!");
//     if (!item.selectedSize) return alert("⚠️ Select size first!");

//     setCartItems((prev) => {
//       const exists = prev.some((i) => i.id === item.id);
//       if (exists) return prev;
//       return [...prev, item];
//     });
//   };

//   const removeFromCart = (item) => {
//     setCartItems((prev) => prev.filter((i) => i.id !== item.id));
//   };

//   // ✅ WISHLIST
//   const addToWishlist = (item) => {
//     const user = getUser();
//     if (!user) return alert("⚠️ Please login first!");

//     setWishlistItems((prev) => {
//       const exists = prev.some((i) => i.id === item.id);
//       if (exists) return prev;
//       return [...prev, item];
//     });
//   };

//   const removeFromWishlist = (item) => {
//     setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));
//   };

//   const isInWishlist = (item) => {
//     return wishlistItems.some((i) => i.id === item.id);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         wishlistItems,
//         addToCart,
//         removeFromCart,
//         addToWishlist,
//         removeFromWishlist,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }







import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);

  // 🔥 GET USER
  const getUser = () => {
    try {
      const user = localStorage.getItem("loggedInUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  };

  // 🔥 SAFE KEYS (NO NULL ISSUE)
  const getCartKey = () => {
    const user = getUser();
    return user?.id ? `cart_${user.id}` : "cart_guest";
  };

  const getWishlistKey = () => {
    const user = getUser();
    return user?.id ? `wishlist_${user.id}` : "wishlist_guest";
  };

  // ✅ LOAD USER DATA
  const loadUserData = async () => {
    setIsCartLoaded(false);
    setIsWishlistLoaded(false);
    const user = getUser();
    const cartKey = getCartKey();
    const wishlistKey = getWishlistKey();
    const token = localStorage.getItem("authToken");
    const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    // 1. Load wishlist (from backend if user is logged in, else localStorage)
    if (user?.id && token) {
      try {
        const response = await fetch(`${apiBase}/api/wishlist/${user.id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setWishlistItems(data.items || []);
        } else {
          const savedWishlist = localStorage.getItem(wishlistKey);
          setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
        }
      } catch (err) {
        console.error("Error loading wishlist from backend:", err);
        const savedWishlist = localStorage.getItem(wishlistKey);
        setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
      }
    } else {
      try {
        const savedWishlist = localStorage.getItem(wishlistKey);
        setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
      } catch {
        setWishlistItems([]);
      }
    }
    setIsWishlistLoaded(true);

    // 2. Load cart (from backend if user is logged in, else localStorage)
    if (user?.id && token) {
      try {
        const response = await fetch(`${apiBase}/api/cart/${user.id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items || []);
        } else {
          const savedCart = localStorage.getItem(cartKey);
          setCartItems(savedCart ? JSON.parse(savedCart) : []);
        }
      } catch (err) {
        console.error("Error loading cart from backend:", err);
        const savedCart = localStorage.getItem(cartKey);
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      }
    } else {
      try {
        const savedCart = localStorage.getItem(cartKey);
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      } catch {
        setCartItems([]);
      }
    }
    setIsCartLoaded(true);
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    loadUserData();
  }, []);

  // 🔥 LOGIN / LOGOUT CHANGE
  useEffect(() => {
    const handleUserChange = () => {
      loadUserData();
    };

    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  // ✅ SAVE CART & SYNC TO BACKEND
  useEffect(() => {
    if (!isCartLoaded) return;

    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    const user = getUser();
    const token = localStorage.getItem("authToken");
    const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    if (user?.id && token) {
      const syncCart = async () => {
        try {
          await fetch(`${apiBase}/api/cart/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ items: cartItems }),
          });
        } catch (err) {
          console.error("Error syncing cart to backend:", err);
        }
      };
      syncCart();
    }
  }, [cartItems, isCartLoaded]);

  // ✅ SAVE WISHLIST & SYNC TO BACKEND
  useEffect(() => {
    if (!isWishlistLoaded) return;

    const wishlistKey = getWishlistKey();
    localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));

    const user = getUser();
    const token = localStorage.getItem("authToken");
    const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    if (user?.id && token) {
      const syncWishlist = async () => {
        try {
          await fetch(`${apiBase}/api/wishlist/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ items: wishlistItems }),
          });
        } catch (err) {
          console.error("Error syncing wishlist to backend:", err);
        }
      };
      syncWishlist();
    }
  }, [wishlistItems, isWishlistLoaded]);

  // ✅ ADD TO CART
  const addToCart = (item) => {
    const user = getUser();

    if (!user) {
      alert("⚠️ Please login first!");
      return;
    }

    if (!item.selectedSize) {
      alert("⚠️ Please select size!");
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize
      );
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.selectedSize === item.selectedSize
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ REMOVE CART
  const removeFromCart = (item) => {
    setCartItems((prev) =>
      prev.filter(
        (i) => !(i.id === item.id && i.selectedSize === item.selectedSize)
      )
    );
  };

  // ✅ UPDATE CART QUANTITY
  const updateCartQuantity = (itemId, selectedSize, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === itemId && i.selectedSize === selectedSize
          ? { ...i, quantity: newQuantity }
          : i
      )
    );
  };

  // ✅ ADD WISHLIST
  const addToWishlist = (item) => {
    const user = getUser();

    if (!user) {
      alert("⚠️ Please login first!");
      return;
    }

    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) return prev;

      return [...prev, item];
    });
  };

  // ✅ REMOVE WISHLIST
  const removeFromWishlist = (item) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  // ✅ CHECK WISHLIST
  const isInWishlist = (item) => {
    return wishlistItems.some((i) => i.id === item.id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}




// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export function useCart() {
//   return useContext(CartContext);
// }

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   const getUser = () => {
//     const user = localStorage.getItem("loggedInUser");
//     return user ? JSON.parse(user) : null;
//   };

//   const getCartKey = () => {
//     const user = getUser();
//     return user ? `cart_${user.id}` : null;
//   };

//   const getWishlistKey = () => {
//     const user = getUser();
//     return user ? `wishlist_${user.id}` : null;
//   };

//   const loadUserData = () => {
//     const cartKey = getCartKey();
//     const wishlistKey = getWishlistKey();

//     setCartItems(
//       cartKey ? JSON.parse(localStorage.getItem(cartKey)) || [] : []
//     );

//     setWishlistItems(
//       wishlistKey ? JSON.parse(localStorage.getItem(wishlistKey)) || [] : []
//     );
//   };

//   useEffect(() => {
//     loadUserData();
//     window.addEventListener("userChanged", loadUserData);
//     return () => window.removeEventListener("userChanged", loadUserData);
//   }, []);

//   useEffect(() => {
//     const cartKey = getCartKey();
//     if (cartKey) localStorage.setItem(cartKey, JSON.stringify(cartItems));
//   }, [cartItems]);

//   useEffect(() => {
//     const wishlistKey = getWishlistKey();
//     if (wishlistKey)
//       localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   // ✅ ADD TO CART (FIXED)
//   const addToCart = (item) => {
//     const user = getUser();

//     if (!user) {
//       alert("⚠️ Please login first!");
//       return;
//     }

//     if (!item.selectedSize) {
//       alert("⚠️ Please select size first!");
//       return;
//     }

//     setCartItems((prev) => {
//       const exists = prev.some((i) => i.id === item.id);
//       if (exists) return prev;
//       return [...prev, item];
//     });
//   };

//   // ✅ REMOVE
//   const removeFromCart = (item) => {
//     setCartItems((prev) =>
//       prev.filter((i) => i.id !== item.id)
//     );
//   };

//   // ✅ WISHLIST
//   const addToWishlist = (item) => {
//     const user = getUser();
//     if (!user) return alert("⚠️ Please login first!");

//     setWishlistItems((prev) => {
//       const exists = prev.some((i) => i.id === item.id);
//       if (exists) return prev;
//       return [...prev, item];
//     });
//   };

//   const removeFromWishlist = (item) => {
//     setWishlistItems((prev) =>
//       prev.filter((i) => i.id !== item.id)
//     );
//   };

//   const isInWishlist = (item) => {
//     return wishlistItems.some((i) => i.id === item.id);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         wishlistItems,
//         addToCart,
//         removeFromCart,
//         addToWishlist,
//         removeFromWishlist,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }