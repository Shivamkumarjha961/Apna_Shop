// import React from "react";
// import { useCart } from "./CartContext";

// export default function CartPage() {
//   const { cartItems, removeFromCart } = useCart();

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.price,
//     0
//   );

//   return (
//     <div className="max-w-6xl mx-auto mt-10 pt-10 px-4">
//       <h2 className="text-center text-blue-600 text-3xl font-bold mb-8">
//         🛒 Your Shopping Bag
//       </h2>

//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-500">
//           Your bag is empty.
//         </p>
//       ) : (
//         <>
//           <div className="grid md:grid-cols-2 gap-6">
//             {cartItems.map((item, index) => (
//               <div key={index}>
//                 <div className="p-4 border rounded-lg flex gap-4 items-center shadow-sm">
//                   <img
//                     src={item.img}
//                     alt={item.name}
//                     className="w-[100px] h-[100px] object-cover"
//                   />

//                   <div className="flex-1">
//                     <h6 className="font-semibold mb-1">
//                       {item.name}
//                     </h6>
//                     <p className="text-gray-500 mb-1">
//                       {item.title}
//                     </p>
//                     <p className="mb-1">
//                       Size:{" "}
//                       <strong>{item.selectedSize}</strong>
//                     </p>
//                     <p className="font-bold">
//                       ₹{item.price}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() => removeFromCart(item)}
//                     className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <hr className="my-6 border-gray-300" />

//           <h4 className="text-right text-green-600 text-xl font-semibold pr-2">
//             Total: ₹{totalAmount}
//           </h4>
//         </>
//       )}
//     </div>
//   );
// }



import React from "react";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartQuantity } = useCart();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleBuyNow = (item) => {
    alert(`✅ Order placed for ${item.name}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 pt-16 px-4">
      <h2 className="text-center text-blue-600 text-3xl font-bold mb-8">
        🛒 Your Shopping Bag
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Your bag is empty.
        </p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">

            {cartItems.map((item) => (
              <div key={`${item.id}_${item.selectedSize}`}>
                <div className="p-4 border rounded-lg flex gap-4 items-center shadow-sm">

                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-[100px] h-[100px] object-cover"
                  />

                  <div className="flex-1">
                    <h6 className="font-semibold mb-1">
                      {item.name}
                    </h6>

                    <p className="text-gray-500 mb-1">
                      {item.title}
                    </p>

                    <p className="mb-1">
                      Size:{" "}
                      <strong>{item.selectedSize}</strong>
                    </p>

                    <p className="font-bold mb-2">
                      ₹{item.price * (item.quantity || 1)}
                    </p>

                    {/* Qty Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Qty:</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.selectedSize, (item.quantity || 1) - 1)}
                        className="border px-2 py-0.5 rounded hover:bg-gray-100 font-bold"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span className="font-semibold px-1">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.selectedSize, (item.quantity || 1) + 1)}
                        className="border px-2 py-0.5 rounded hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 🔥 BUTTONS */}
                  <div className="flex flex-col gap-2">

                    {/* BUY NOW */}
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-sm font-semibold transition"
                    >
                      Buy Now
                    </button>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeFromCart(item)}
                      className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>

          <hr className="my-6 border-gray-300" />

          <h4 className="text-right text-green-600 text-xl font-semibold pr-2">
            Total: ₹{totalAmount}
          </h4>
        </>
      )}
    </div>
  );
}