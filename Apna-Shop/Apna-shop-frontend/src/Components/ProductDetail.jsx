import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allProducts, getStableProductDetails } from "./AllProducts";
import { useCart } from "./CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  
  const [selectedSize, setSelectedSize] = useState("");

  const rawProduct = allProducts.find((p) => p.id === Number(id));
  const product = getStableProductDetails(rawProduct);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
        <button onClick={() => navigate(-1)} className="border px-4 py-2 rounded-lg bg-red-500 text-white">
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size");
    addToCart({ ...product, selectedSize });
  };

  const toggleWishlist = () => {
    if (isInWishlist(product)) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-28 pb-12 px-4 min-h-screen bg-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 border border-gray-300 hover:border-gray-800 px-5 py-2 rounded-lg text-sm transition font-medium flex items-center gap-2"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="border border-gray-100 p-8 rounded-2xl bg-gray-50 flex items-center justify-center relative">
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:scale-105 transition text-2xl"
          >
            {isInWishlist(product) ? (
              <FaHeart className="text-red-600" />
            ) : (
              <FaRegHeart className="text-gray-400 hover:text-red-500" />
            )}
          </button>
          <img
            src={product.img}
            alt={product.name}
            className="h-[450px] w-full object-contain mx-auto mix-blend-multiply"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{product.name}</h2>
          <p className="text-lg text-gray-500 mt-2 font-medium">{product.title}</p>
          
          <div className="flex items-center gap-3 mt-4">
            <span className="bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-full font-bold">
              {product.discount}% OFF
            </span>
            <span className="text-sm text-gray-400 font-semibold">{product.rating} ★ ({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-4 mt-6">
            <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
            <del className="text-xl text-gray-400 font-semibold">₹{product.mrp}</del>
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Size Selector */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Select Size</h3>
            <div className="flex gap-3 flex-wrap mt-4">
              {product.sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  disabled={size.stock === 0}
                  className={`border px-5 py-3 rounded-xl font-semibold transition text-sm relative ${
                    size.stock === 0
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed line-through"
                      : selectedSize === size.label
                      ? "border-black bg-black text-white shadow-md scale-105"
                      : "border-gray-300 hover:border-gray-800 text-gray-800"
                  }`}
                >
                  {size.label}
                  {size.stock > 0 && size.stock < 3 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                      {size.stock} left
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition active:translate-y-[0px]"
            >
              ADD TO BAG
            </button>

            <button
              onClick={() => {
                if (!selectedSize) return alert("Please select a size first");
                addToCart({ ...product, selectedSize });
                navigate("/cart");
              }}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition active:translate-y-[0px]"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}