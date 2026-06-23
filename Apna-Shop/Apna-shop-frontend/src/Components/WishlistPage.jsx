// import React from "react";
// import { useCart } from "./CartContext";
// import { FaHeart } from "react-icons/fa";
// export default function WishlistPage() {
//   const { wishlistItems, addToCart, removeFromWishlist } = useCart();

//   return (
//     <div className="max-w-6xl mx-auto px-4 pt-24">
//       <h2 className="text-center text-red-600 text-3xl font-bold mb-6">
//         ❤️ Your Wishlist
//       </h2>

//       {wishlistItems.length === 0 ? (
//         <p className="text-center text-gray-500">
//           Your wishlist is empty.
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {wishlistItems.map((item, index) => (
//             <div
//               key={index}
//               className="border rounded-lg p-4 flex gap-4 items-center shadow-sm"
//             >
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded"
//               />

//               <div className="flex-1">
//                 <h6 className="font-semibold mb-1">
//                   {item.name}
//                 </h6>
//                 <p className="text-gray-500 text-sm mb-1">
//                   {item.title}
//                 </p>
//                 <p className="font-bold mb-2">
//                   ₹{item.price}
//                 </p>

//                 <div className="flex gap-2 mt-2">
//                   <button
//                     className="text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
//                     onClick={() => addToCart(item)}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     className="text-sm border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
//                     onClick={() => removeFromWishlist(item)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import React from "react";
// import { useCart } from "./CartContext";
// import { useNavigate } from "react-router-dom";   // ✅ add

// export default function WishlistPage() {
//   const { wishlistItems, addToCart, removeFromWishlist } = useCart();
//   const navigate = useNavigate();  // ✅ add

//   return (
//     <div className="max-w-6xl mx-auto px-4 pt-24">
//       <h2 className="text-center text-red-600 text-3xl font-bold mb-6">
//         ❤️ Your Wishlist
//       </h2>

//       {wishlistItems.length === 0 ? (
//         <p className="text-center text-gray-500">
//           Your wishlist is empty.
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {wishlistItems.map((item) => (
//             <div
//               key={item.id}   // ✅ FIX (index हटाया)
//               className="border rounded-lg p-4 flex gap-4 items-center shadow-sm cursor-pointer hover:shadow-md transition"
//               onClick={() => navigate(`/product/${item.id}`)}  // ✅ MAIN LINE
//             >
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded"
//               />

//               <div className="flex-1">
//                 <h6 className="font-semibold mb-1">
//                   {item.name}
//                 </h6>
//                 <p className="text-gray-500 text-sm mb-1">
//                   {item.title}
//                 </p>
//                 <p className="font-bold mb-2">
//                   ₹{item.price}
//                 </p>

//                 {/* ⚠️ button click pe navigation na ho */}
//                 <div
//                   className="flex gap-2 mt-2"
//                   onClick={(e) => e.stopPropagation()} // ✅ IMPORTANT
//                 >
//                   <button
//                     className="text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
//                     onClick={() => addToCart(item)}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     className="text-sm border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
//                     onClick={() => removeFromWishlist(item)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






import React, { useState } from "react";
import { useCart } from "./CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function WishlistPage() {
  const {
    wishlistItems,
    addToCart,
    removeFromWishlist,
    isInWishlist,
  } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedSize("");
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setSelectedSize("");
  };

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select size");
    addToCart({ ...selectedProduct, selectedSize });
  };

  return (
    <div className="relative py-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <h2 className="text-center text-red-600 text-3xl font-bold mb-8">
          ❤️ Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openProduct(item)}
                className="border rounded-lg p-4 flex gap-4 items-center shadow-sm cursor-pointer hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* Info */}
                <div className="flex-1">
                  <h6 className="font-semibold">{item.name}</h6>
                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>
                  <p className="font-bold">₹{item.price}</p>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProduct(item);
                      }}
                      className="text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(item);
                      }}
                      className="text-sm border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Heart */}
                {/* <FaHeart className="text-red-500 text-xl" /> */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedProduct && (
        <div className="fixed left-0 w-full bg-white top-[65px] z-50 h-screen overflow-auto shadow-lg">
          <div className="max-w-7xl mx-auto py-6 px-4 relative">

            {/* Back */}
            <button
              onClick={closeProduct}
              className="border px-4 py-2 rounded mb-4"
            >
              ← Back
            </button>

            {/* Wishlist toggle */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => removeFromWishlist(selectedProduct)}
              >
                {isInWishlist(selectedProduct) ? (
                  <FaHeart className="text-red-600 text-2xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 text-2xl" />
                )}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-10">

              {/* Image */}
              <img
                src={selectedProduct.img}
                alt=""
                className="h-[400px] object-contain mx-auto"
              />

              {/* Info */}
              <div>
                <h3 className="text-2xl font-bold">
                  {selectedProduct.name}
                </h3>
                <p className="text-gray-500">
                  {selectedProduct.title}
                </p>

                {/* Price */}
                <div className="my-3">
                  <span className="text-2xl font-bold">
                    ₹{selectedProduct.price}
                  </span>{" "}
                  <del className="text-gray-400">
                    ₹{selectedProduct.mrp}
                  </del>
                </div>

                {/* Size */}
                <div className="my-4">
                  <h6 className="font-semibold mb-2">
                    SELECT SIZE
                  </h6>

                  <div className="flex gap-3 flex-wrap">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`border px-4 py-2 rounded ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6 flex-wrap">

                  <button
                    onClick={handleAddToCart}
                    className="bg-red-600 text-white px-6 py-2 rounded"
                  >
                    ADD TO BAG
                  </button>

                  <button
                    onClick={() => {
                      if (!selectedSize)
                        return alert("Select size first");
                      addToCart({
                        ...selectedProduct,
                        selectedSize,
                      });
                      alert("Proceed to buy");
                    }}
                    className="bg-yellow-400 px-6 py-2 rounded"
                  >
                    BUY NOW
                  </button>

                  <button
                    onClick={() => {
                      removeFromWishlist(selectedProduct);
                      closeProduct();
                    }}
                    className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-500 hover:text-white"
                  >
                    REMOVE
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}