import React, { useState, useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { allProducts, getStableProductDetails } from "./AllProducts";

export default function KidsSection() {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  // 🔥 Filter + process products
  const products = useMemo(() => {
    return allProducts
      .filter((p) => p.category === "kids")
      .map((product) => getStableProductDetails(product));
  }, []);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedSize("");
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setSelectedSize("");
  };

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size");
    addToCart({ ...selectedProduct, selectedSize });
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product)) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="relative py-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-10 mt-10 px-4">
        <h2 className="text-red-600 font-bold text-3xl text-center mb-10">
          Welcome to the Kids' Section
        </h2>

        {/* 🔥 Product Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative group">

              {/* ❤️ Wishlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow text-xl"
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
                className="bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-[250px] w-full object-cover"
                />

                <div className="text-center p-4">
                  <h5 className="font-semibold">{product.name}</h5>
                  <p className="text-gray-500 text-sm">
                    {product.title}
                  </p>
                  <p className="font-semibold text-black">
                    ₹{product.price}
                  </p>
                  <small className="text-red-600">
                    {product.discount}% OFF
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 MODAL */}
      {selectedProduct && (
        <div className="fixed left-0 w-full bg-white top-[65px] z-50 h-screen overflow-auto shadow-lg">
          <div className="max-w-7xl mx-auto py-4 px-4 relative">

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
                className="h-[400px] object-contain mx-auto"
              />

              {/* Info */}
              <div>
                <h4 className="font-bold text-xl">
                  {selectedProduct.name}
                </h4>
                <p className="text-gray-500">
                  {selectedProduct.title}
                </p>

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
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size.label)}
                        className={`border px-4 py-2 rounded ${
                          selectedSize === size.label
                            ? "bg-black text-white"
                            : ""
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
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
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}