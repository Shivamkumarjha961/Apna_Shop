// import { useLocation } from "react-router-dom";
// import { allProducts } from "./AllProducts";

// export default function SearchPage() {
//   const query = new URLSearchParams(useLocation().search).get("q");

//   const filtered = allProducts.filter((item) =>
//     (item.name + item.title)
//       .toLowerCase()
//       .includes(query.toLowerCase())
//   );

//   return (
//     <div className="p-6 mt-20">
//       <h2 className="text-xl font-bold mb-4">
//         Results for "{query}"
//       </h2>

//       <div className="grid md:grid-cols-4 gap-4">
//         {filtered.length > 0 ? (
//           filtered.map((item, idx) => (
//             <div key={idx} className="border p-3 rounded shadow">
//               <img src={item.img} className="h-40 w-full object-cover" />
//               <h4 className="font-semibold">{item.name}</h4>
//               <p className="text-sm">{item.title}</p>
//               <p className="text-green-600 text-sm">{item.category}</p>
//             </div>
//           ))
//         ) : (
//           <p>No products found</p>
//         )}
//       </div>
//     </div>
//   );
// }



import { useLocation } from "react-router-dom";
import { useState } from "react";
import { allProducts, getStableProductDetails } from "./AllProducts";
import { useCart } from "./CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function SearchPage() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useCart();

  const query = new URLSearchParams(useLocation().search).get("q") || "";

  const normalize = (str) => str.toLowerCase().replace(/s$/, "");

  const filtered = allProducts
    .filter((item) => {
      const text = normalize(item.name + " " + item.title);
      const q = normalize(query);
      return text.includes(q);
    })
    .map((item) => getStableProductDetails(item));

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

  const toggleWishlist = (product) => {
    isInWishlist(product)
      ? removeFromWishlist(product)
      : addToWishlist(product);
  };

  return (
    <div className="p-6 mt-20 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        Results for "{query}"
      </h2>

      {/* 🔲 GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <div key={product.id} className="relative group">

              {/* ❤️ Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-2 right-2 z-10 text-xl"
              >
                {isInWishlist(product) ? (
                  <FaHeart className="text-red-600" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-red-500" />
                )}
              </button>

              {/* Card */}
              <div
                onClick={() => openProduct(product)}
                className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
              >
                <img
                  src={product.img}
                  className="h-48 w-full object-cover"
                />

                <div className="p-3 text-center">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-500">
                    {product.title}
                  </p>
                  <p className="font-bold text-gray-900 mt-1">
                    ₹{product.price}
                  </p>
                  <p className="text-red-600 text-xs mt-1 font-semibold">
                    {product.discount}% OFF
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedProduct && (
        <div className="fixed left-0 w-full bg-white top-[65px] z-50 h-screen overflow-hidden shadow-lg">
          <div className="max-w-6xl mx-auto py-4 px-4 relative">

            <button
              onClick={closeProduct}
              className="border px-4 py-2 rounded mb-4"
            >
              ← Back
            </button>

            {/* ❤️ Wishlist */}
            <div className="absolute top-4 right-4">
              <button onClick={() => toggleWishlist(selectedProduct)}>
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
                className="h-[400px] object-contain"
              />

              {/* Info */}
              <div>
                <h2 className="text-xl font-bold">
                  {selectedProduct.name}
                </h2>
                <p className="text-gray-500">
                  {selectedProduct.title}
                </p>

                {/* Price */}
                <div className="my-3 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{selectedProduct.price}
                  </span>
                  <del className="text-gray-400">
                    ₹{selectedProduct.mrp}
                  </del>
                  <span className="text-red-600 text-sm font-semibold">
                    ({selectedProduct.discount}% OFF)
                  </span>
                </div>

                {/* Sizes */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">
                    SELECT SIZE
                  </h4>

                  <div className="flex gap-3">
                    {selectedProduct.sizes?.map((size) => (
                      <button
                        key={size.label}
                        disabled={size.stock === 0}
                        onClick={() => setSelectedSize(size.label)}
                        className={`border px-4 py-2 rounded font-semibold transition ${
                          size.stock === 0
                            ? "bg-gray-50 text-gray-400 line-through cursor-not-allowed border-gray-200"
                            : selectedSize === size.label
                            ? "bg-black text-white"
                            : "hover:border-black"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  >
                    ADD TO CART
                  </button>

                  <button
                    onClick={() => {
                      if (!selectedSize)
                        return alert("Select size first");
                      alert("Proceed to buy");
                    }}
                    className="bg-yellow-400 px-6 py-2 rounded hover:bg-yellow-500 transition text-black font-semibold"
                  >
                    BUY NOW
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