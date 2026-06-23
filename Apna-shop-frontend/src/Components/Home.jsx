import React, { useState } from 'react';
import { useCart } from './CartContext'; // ✅ Import context hook

export default function Home() {
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart(); // ✅ Use global cart functions

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');

    const openProduct = (product) => {
        setSelectedProduct(product);
        setSelectedSize('');
    };

    const closeProduct = () => {
        setSelectedProduct(null);
        setSelectedSize('');
    };

    const handleAddToCart = () => {
        if (selectedProduct.sizes?.length > 0 && !selectedSize) {
            return alert('Please select a size');
        }
        addToCart({ ...selectedProduct, selectedSize });
        // alert(`Added to Bag${selectedProduct.sizes?.length > 0 ? ` - Size: ${selectedSize}` : ''}`);
    };

    const handleWishlist = () => {
        if (!selectedProduct) return;
        const isWishlisted = isInWishlist(selectedProduct);
        if (isWishlisted) {
            removeFromWishlist(selectedProduct);
            // alert('Removed from Wishlist');
        } else {
            addToWishlist(selectedProduct);
            // alert('Added to Wishlist');
        }
    };

    const handleBuyNow = () => {
        if (selectedProduct.sizes?.length > 0 && !selectedSize) {
            return alert('Please select a size');
        }
        // alert(`Buying Now${selectedProduct.sizes?.length > 0 ? ` - Size: ${selectedSize}` : ''}`);
    };

    const combinedItems = [
        {
            title: "Top Deals",
            items: [
                { name: 'Apple', title: 'Apple iPads', subtitle: 'Min 45% Off', img: '/images/combinedItems/ipad.png', mrp: 59999, price: 32999, rating: 4.6, reviews: '3.4k' },
                { name: 'Cadbury', title: 'Chocolates', subtitle: 'Min 60% Off', img: '/images/combinedItems/chocolates.png', mrp: 899, price: 359, rating: 4.4, reviews: '1.2k' },
                { name: 'Mi', title: 'Buy Now', subtitle: 'Min 30% Off', img: '/images/combinedItems/charger.png', mrp: 499, price: 349, rating: 4.2, reviews: '800' },
                { name: 'Canon', title: 'Camera Bags', subtitle: 'Min 50% Off', img: '/images/combinedItems/camera-bag.png', mrp: 1599, price: 799, rating: 4.3, reviews: '650' },
                { name: 'Noise', title: 'Smart Watches', subtitle: 'Min 40% Off', img: '/images/combinedItems/smartwatch.png', mrp: 3499, price: 2099, rating: 4.5, reviews: '2.1k' },
                { name: 'boAt', title: 'Grab Now', subtitle: 'Min 35% Off', img: '/images/combinedItems/usb-cable.png', mrp: 299, price: 195, rating: 4.0, reviews: '1.0k' },
                { name: 'Realme', title: 'Bluetooth Neckband', subtitle: 'Min 50% Off', img: '/images/combinedItems/neckband.png', mrp: 1799, price: 949, rating: 4.3, reviews: '1.1k' },
                { name: 'Samsung', title: 'Power Bank 10000mAh', subtitle: 'Min 40% Off', img: '/images/combinedItems/powerbank.png', mrp: 2499, price: 1499, rating: 4.4, reviews: '1.9k' },
                { name: 'OnePlus', title: 'Wireless Earbuds', subtitle: 'Min 45% Off', img: '/images/combinedItems/earbuds.png', mrp: 2999, price: 1649, rating: 4.5, reviews: '2.3k' }
            ]
        },
        {
            title: "Books, Toys & More",
            items: [
                { name: 'Vega', img: '/images/combinedItems/helmet.png', title: 'Helmet', subtitle: 'Min 55% Off', mrp: 2499, price: 1125, rating: 4.3, reviews: '1.1k' },
                { name: 'AutoDesign', img: '/images/combinedItems/sticker.png', title: 'Car Sticker And Decal', subtitle: 'Min 70% Off', mrp: 199, price: 60, rating: 4.1, reviews: '750' },
                { name: 'Philips', img: '/images/combinedItems/bike-light.png', title: 'Bike Light Bulb', subtitle: 'Min 40% Off', mrp: 799, price: 479, rating: 4.0, reviews: '620' },
                { name: 'Raida', img: '/images/combinedItems/bike-cover.png', title: 'Bike Body Cover', subtitle: 'Min 50% Off', mrp: 1099, price: 549, rating: 4.2, reviews: '900' },
                { name: 'AutoFurnish', img: '/images/combinedItems/car-cover.png', title: 'Car Body Cover', subtitle: 'Min 60% Off', mrp: 1799, price: 720, rating: 4.4, reviews: '1.3k' },
                { name: '3M', img: '/images/combinedItems/wash-cloth.png', title: 'Vehicle Washing Cloth', subtitle: 'Min 45% Off', mrp: 299, price: 165, rating: 4.1, reviews: '840' },
                { name: 'Speedwav', img: '/images/combinedItems/mobile-holder.png', title: 'Bike Mobile Holder', subtitle: 'Min 50% Off', mrp: 799, price: 395, rating: 4.2, reviews: '500' },
                { name: 'Toys R Us', img: '/images/combinedItems/kids-toy.png', title: 'Remote Car Toy', subtitle: 'Min 60% Off', mrp: 999, price: 399, rating: 4.3, reviews: '1.1k' },
                { name: 'Nilkamal', img: '/images/combinedItems/kids-table.png', title: 'Kids Study Table', subtitle: 'Min 50% Off', mrp: 1999, price: 999, rating: 4.4, reviews: '650' }
            ]
        },
        {
            title: "Beauty, Food, Toys & more",
            items: [
                { name: 'Maybelline', title: 'Matte Lipstick', subtitle: 'Min 40% Off', img: '/images/combinedItems/beauty-lipstick.png', mrp: 499, price: 299, rating: 4.4, reviews: '3.1k' },
                { name: 'Mamaearth', title: 'Face Wash', subtitle: 'Min 50% Off', img: '/images/combinedItems/beauty-facewash.png', mrp: 349, price: 175, rating: 4.3, reviews: '2.7k' },
                { name: 'Nestlé', title: 'Munch Chocolates Pack', subtitle: 'Min 60% Off', img: '/images/combinedItems/food-chocolates.png', mrp: 199, price: 80, rating: 4.5, reviews: '4.0k' },
                { name: 'Lego', title: 'Creative Building Blocks', subtitle: 'Min 45% Off', img: '/images/combinedItems/toys-lego.png', mrp: 1599, price: 880, rating: 4.7, reviews: '1.9k' },
                { name: 'Hot Wheels', title: 'Die-cast Cars Set', subtitle: 'Min 50% Off', img: '/images/combinedItems/toys-hotwheels.png', mrp: 999, price: 499, rating: 4.4, reviews: '2.2k' },
                { name: 'Nivea', title: 'Body Lotion', subtitle: 'Min 35% Off', img: '/images/combinedItems/beauty-lotion.png', mrp: 275, price: 179, rating: 4.2, reviews: '1.5k' },
                { name: 'Garnier', title: 'Hair Serum', subtitle: 'Min 45% Off', img: '/images/combinedItems/beauty-serum.png', mrp: 399, price: 215, rating: 4.3, reviews: '920' },
                { name: 'Kinder', title: 'Chocolate Surprise', subtitle: 'Min 50% Off', img: '/images/combinedItems/food-kinder.png', mrp: 299, price: 149, rating: 4.6, reviews: '2.0k' },
                { name: 'Funskool', title: 'Play Dough Kit', subtitle: 'Min 40% Off', img: '/images/combinedItems/toys-playdough.png', mrp: 799, price: 429, rating: 4.5, reviews: '1.2k' }
            ]
        }
    ];

    const categories = [
        {
            title: "Fashion's Top Deals",
            items: [
                { name: "Sparx", title: "Men’s Slippers &...", subtitle: "Min. 70% Off", img: "/images/categories/slippers.png", price: 299, mrp: 999, discount: "70% Off", rating: 4.2, reviews: "1.5k" },
                { name: "Roadster", title: "Men's T-shirts", subtitle: "Min. 50% Off", img: "/images/categories/tshirt.webp", price: 349, mrp: 699, discount: "50% Off", rating: 4.0, reviews: "2.3k" },
                { name: "Allen Solly", title: "Casual Shirts", subtitle: "Special offer", img: "/images/categories/shirt.jpg", price: 799, mrp: 1599, discount: "50% Off", rating: 4.3, reviews: "870" },
                { name: "Biba", title: "Women's Sarees", subtitle: "In Focus Now", img: "/images/categories/saree.jpg", price: 1299, mrp: 2599, discount: "50% Off", rating: 4.5, reviews: "1.2k" }
            ]
        },
        {
            title: "Trendy Women's Wear",
            items: [
                { name: "Zara", title: "Party Dresses", subtitle: "Hot Picks", img: "/images/categories/dress.png", price: 1999, mrp: 3999, discount: "50% Off", rating: 4.6, reviews: "950" },
                { name: "W", title: "Kurtas & Kurtis", subtitle: "Top Rated", img: "/images/categories/kurti.webp", price: 1199, mrp: 2399, discount: "50% Off", rating: 4.4, reviews: "1.8k" },
                { name: "H&M", title: "Jeans for Women", subtitle: "Min. 40% Off", img: "/images/categories/jeans.webp", price: 1599, mrp: 2699, discount: "41% Off", rating: 4.3, reviews: "1.5k" },
                { name: "AND", title: "Tops & Tunics", subtitle: "Just Arrived", img: "/images/categories/top.webp", price: 899, mrp: 1799, discount: "50% Off", rating: 4.2, reviews: "1.1k" }
            ]
        },
        {
            title: "Men's Fashion Essentials",
            items: [
                { name: "Levi's", title: "Men's Jeans", subtitle: "Premium Quality", img: "/images/categories/men-jeans.png", price: 1999, mrp: 3999, discount: "50% Off", rating: 4.5, reviews: "2.0k" },
                { name: "Nike", title: "Sports Shoes", subtitle: "Bestseller", img: "/images/categories/shoes.webp", price: 2499, mrp: 4999, discount: "50% Off", rating: 4.6, reviews: "3.1k" },
                { name: "UCB", title: "Polo T-Shirts", subtitle: "Trending Now", img: "/images/categories/polo.webp", price: 999, mrp: 1999, discount: "50% Off", rating: 4.3, reviews: "1.4k" },
                { name: "Adidas", title: "Track Pants", subtitle: "Most Loved", img: "/images/categories/trackpants.webp", price: 1499, mrp: 2999, discount: "50% Off", rating: 4.4, reviews: "1.6k" }
            ]
        },
        {
            title: "Kids & Baby Fashion",
            items: [
                { name: "Hopscotch", title: "Baby Dresses", subtitle: "Adorable Looks", img: "/images/categories/baby-dress.png", price: 799, mrp: 1599, discount: "50% Off", rating: 4.5, reviews: "870" },
                { name: "Mini Klub", title: "Baby Rompers", subtitle: "Cute & Comfy", img: "/images/categories/romper.png", price: 499, mrp: 999, discount: "50% Off", rating: 4.4, reviews: "720" },
                { name: "Babyhug", title: "Footwear for Kids", subtitle: "Min. 40% Off", img: "/images/categories/kidshoes.png", price: 349, mrp: 699, discount: "50% Off", rating: 4.3, reviews: "530" },
                { name: "ToffyHouse", title: "Frock Set", subtitle: "New Arrival", img: "/images/categories/frock.png", price: 899, mrp: 1799, discount: "50% Off", rating: 4.5, reviews: "610" }
            ]
        },
        {
            title: "Home Decor & Furnishings",
            items: [
                { name: "Ajanta", title: "Wall Clocks", subtitle: "Top Sellers", img: "/images/categories/clock.jpg", price: 599, mrp: 1199, discount: "50% Off", rating: 4.4, reviews: "980" },
                { name: "GoodKnight", title: "Mosquito Killers", subtitle: "Min. 50% Off", img: "/images/categories/mosquito.webp", price: 299, mrp: 599, discount: "50% Off", rating: 4.1, reviews: "1.1k" },
                { name: "Eveready", title: "Torches", subtitle: "Special offer", img: "/images/categories/torch.webp", price: 249, mrp: 499, discount: "50% Off", rating: 4.0, reviews: "630" },
                { name: "Philips", title: "Bulbs", subtitle: "Don't Miss", img: "/images/categories/bulb.webp", price: 99, mrp: 199, discount: "50% Off", rating: 4.6, reviews: "2.1k" }
            ]
        },
        {
            title: "Make your home stylish",
            items: [
                { name: "Nilkamal", title: "Shoe Rack", subtitle: "Min. 50% Off", img: "/images/categories/shoerack.webp", price: 1499, mrp: 2999, discount: "50% Off", rating: 4.3, reviews: "890" },
                { name: "Wakefit", title: "Beds", subtitle: "Min. 50% Off", img: "/images/categories/bed.jpg", price: 9999, mrp: 19999, discount: "50% Off", rating: 4.5, reviews: "3.4k" },
                { name: "Woodland", title: "Portable Laptop ...", subtitle: "Min. 50% Off", img: "/images/categories/laptop.jpg", price: 699, mrp: 1399, discount: "50% Off", rating: 4.2, reviews: "1.1k" },
                { name: "LuvLap", title: "Kid Seating", subtitle: "Min. 50% Off", img: "/images/categories/kidseat.webp", price: 899, mrp: 1799, discount: "50% Off", rating: 4.4, reviews: "760" }
            ]
        }
    ];

    const lastCombinedItems = [
        {
            title: "Best of Electronics",
            items: [
                { name: 'Samsung', title: 'LED Smart TV', subtitle: 'Min 45% Off', img: '/images/lastCombinedItems/tv.png', mrp: 39999, price: 21999, rating: 4.5, reviews: '4.2k' },
                { name: 'Sony', title: 'Wireless Headphones', subtitle: 'Min 40% Off', img: '/images/lastCombinedItems/headphones.png', mrp: 9999, price: 5999, rating: 4.4, reviews: '3.1k' },
                { name: 'HP', title: 'Inkjet Printer', subtitle: 'Min 30% Off', img: '/images/lastCombinedItems/printer.png', mrp: 8499, price: 5999, rating: 4.3, reviews: '2.5k' },
                { name: 'Logitech', title: 'Gaming Mouse', subtitle: 'Min 50% Off', img: '/images/lastCombinedItems/mouse.png', mrp: 2999, price: 1499, rating: 4.6, reviews: '1.8k' },
                { name: 'Apple', title: 'iPad Air', subtitle: 'Min 20% Off', img: '/images/lastCombinedItems/ipad.png', mrp: 59999, price: 47999, rating: 4.7, reviews: '6.3k' },
                { name: 'boAt', title: 'Bluetooth Speaker', subtitle: 'Min 35% Off', img: '/images/lastCombinedItems/speaker.png', mrp: 1999, price: 1299, rating: 4.3, reviews: '3.8k' },
                { name: 'Realme', title: 'Smartwatch', subtitle: 'Min 50% Off', img: '/images/lastCombinedItems/watch.png', mrp: 4999, price: 2499, rating: 4.2, reviews: '2.2k' },
                { name: 'Sandisk', title: '128GB Pendrive', subtitle: 'Min 25% Off', img: '/images/lastCombinedItems/pendrive.png', mrp: 1599, price: 999, rating: 4.5, reviews: '4.5k' },
                { name: 'Zebronics', title: 'Webcam HD', subtitle: 'Min 45% Off', img: '/images/lastCombinedItems/webcam.png', mrp: 1699, price: 949, rating: 4.0, reviews: '1.6k' }
            ]
        },
        {
            title: "Sports, Healthcare & More",
            items: [
                { name: 'Yonex', title: 'Badminton Racket', subtitle: 'Min 50% Off', img: '/images/lastCombinedItems/racket.png', mrp: 2499, price: 1249, rating: 4.4, reviews: '1.3k' },
                { name: 'Nivia', title: 'Football Size 5', subtitle: 'Min 45% Off', img: '/images/lastCombinedItems/football.png', mrp: 1199, price: 660, rating: 4.2, reviews: '1.7k' },
                { name: 'Dr. Trust', title: 'BP Monitor', subtitle: 'Min 40% Off', img: '/images/lastCombinedItems/bp.png', mrp: 3499, price: 1999, rating: 4.5, reviews: '2.9k' },
                { name: 'Omron', title: 'Digital Thermometer', subtitle: 'Min 35% Off', img: '/images/lastCombinedItems/thermometer.png', mrp: 499, price: 325, rating: 4.3, reviews: '1.1k' },
                { name: 'Puma', title: 'Men’s Running Shoes', subtitle: 'Min 55% Off', img: '/images/lastCombinedItems/shoes.png', mrp: 5999, price: 2699, rating: 4.6, reviews: '5.2k' },
                { name: 'Fitbit', title: 'Fitness Tracker', subtitle: 'Min 30% Off', img: '/images/lastCombinedItems/fitbit.png', mrp: 7999, price: 5599, rating: 4.4, reviews: '3.0k' },
                { name: 'BPL', title: 'Oximeter', subtitle: 'Min 40% Off', img: '/images/lastCombinedItems/oximeter.png', mrp: 1499, price: 899, rating: 4.1, reviews: '1.4k' },
                { name: 'Adidas', title: 'Gym Bag', subtitle: 'Min 50% Off', img: '/images/lastCombinedItems/bag.png', mrp: 1999, price: 999, rating: 4.3, reviews: '2.1k' },
                { name: 'Eveready', title: 'Rechargeable Torch', subtitle: 'Min 45% Off', img: '/images/lastCombinedItems/torch.png', mrp: 899, price: 495, rating: 4.0, reviews: '840' }
            ]
        },
        {
            title: "Daily Essentials & More",
            items: [
                { name: 'Nestlé', title: 'Munch Chocolates Pack', subtitle: 'Min 60% Off', img: '/images/lastCombinedItems/munch.png', mrp: 199, price: 80, rating: 4.5, reviews: '4.0k' },
                { name: 'Kellogg’s', title: 'Corn Flakes', subtitle: 'Min 35% Off', img: '/images/lastCombinedItems/cornflakes.png', mrp: 399, price: 259, rating: 4.2, reviews: '2.2k' },
                { name: 'Nivea', title: 'Body Lotion', subtitle: 'Min 35% Off', img: '/images/lastCombinedItems/lotion.png', mrp: 275, price: 179, rating: 4.2, reviews: '1.5k' },
                { name: 'Colgate', title: 'Toothpaste Value Pack', subtitle: 'Min 40% Off', img: '/images/lastCombinedItems/toothpaste.png', mrp: 249, price: 149, rating: 4.4, reviews: '3.3k' },
                { name: 'Dettol', title: 'Antiseptic Liquid', subtitle: 'Min 45% Off', img: '/images/lastCombinedItems/dettol.png', mrp: 199, price: 109, rating: 4.5, reviews: '2.1k' },
                { name: 'Lifebuoy', title: 'Hand Wash Refill', subtitle: 'Min 50% Off', img: '/images/lastCombinedItems/handwash.png', mrp: 149, price: 74, rating: 4.3, reviews: '1.9k' },
                { name: 'Surf Excel', title: 'Detergent Powder', subtitle: 'Min 30% Off', img: '/images/lastCombinedItems/detergent.png', mrp: 349, price: 245, rating: 4.6, reviews: '2.7k' },
                { name: 'Tata Salt', title: 'Iodized Salt', subtitle: 'Best Seller', img: '/images/lastCombinedItems/salt.png', mrp: 30, price: 24, rating: 4.7, reviews: '5.1k' },
                { name: 'Britannia', title: 'Good Day Biscuits', subtitle: 'Min 25% Off', img: '/images/lastCombinedItems/biscuits.png', mrp: 99, price: 74, rating: 4.4, reviews: '3.5k' }
            ]
        }

    ];


 return (
    <div className="pt-[64px] bg-gray-100 min-h-screen">
      {/* Banner */}
      <div className="w-full h-[40vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
        <img
          src="/images/header-banner.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto mt-4 px-4">
          <h2 className="text-yellow-500 font-bold text-3xl text-center mb-10">
            Welcome in our Online Shopping page
          </h2>
        </div>

        {/* -------- Horizontal Sections -------- */}
        <div className="max-w-7xl mx-auto mt-10 bg-white px-4 py-6 rounded shadow">
          {combinedItems.map((page, index) => (
            <div key={index}>
              <h4 className="m-4 font-semibold text-lg">{page.title}</h4>

              <div className="flex overflow-x-auto gap-4 px-3">
                {page.items.map((item, idx) => (
                  <div key={idx} className="min-w-[180px]">
                    <div
                      className="text-center bg-white shadow rounded p-3 cursor-pointer hover:shadow-md transition"
                      onClick={() => openProduct(item)}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-[150px] object-contain mx-auto mb-2"
                      />
                      <h6 className="font-medium">{item.title}</h6>
                      <p className="text-blue-600 font-semibold text-sm">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <hr className="my-6 border-2 border-red-500" />

        {/* -------- Categories Grid -------- */}
        <div className="max-w-7xl mx-auto my-6 px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx}>
                <h5 className="font-bold flex justify-between items-center bg-white p-3 shadow">
                  {cat.title}
                  <i className="bi bi-arrow-right-circle text-blue-600"></i>
                </h5>

                <div className="grid grid-cols-2 gap-3 bg-white p-3 shadow">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => openProduct(item)}
                      className="border rounded p-2 text-center cursor-pointer hover:shadow transition"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-[150px] w-full object-contain mb-2"
                      />
                      <div className="font-medium text-sm">
                        {item.title}
                      </div>
                      <div className="text-green-600 font-semibold text-sm">
                        {item.subtitle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-2 border-red-500" />

        {/* -------- Last Combined -------- */}
        <div className="max-w-7xl mx-auto mt-10 bg-white px-4 py-6 rounded shadow">
          {lastCombinedItems.map((page, index) => (
            <div key={index}>
              <h4 className="m-4 font-semibold text-lg">{page.title}</h4>

              <div className="flex overflow-x-auto gap-4 px-3">
                {page.items.map((item, idx) => (
                  <div key={idx} className="min-w-[180px]">
                    <div
                      className="text-center bg-white shadow rounded p-3 cursor-pointer hover:shadow-md transition"
                      onClick={() => openProduct(item)}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-[150px] object-contain mx-auto mb-2"
                      />
                      <h6 className="font-medium">{item.title}</h6>
                      <p className="text-blue-600 font-semibold text-sm">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* -------- Product Modal -------- */}
        {selectedProduct && (
          // <div className="fixed inset-0 bg-white z-50 overflow-y-auto pt-20">
          <div className="fixed top-[56px] left-0 w-full h-screen bg-white z-40 overflow-y-auto pt-8">
            <div className="max-w-6xl mx-auto px-4 relative">

              <button
                onClick={closeProduct}
                className="border px-4 py-2 rounded mb-6"
              >
                ← Back
              </button>

              <div className="absolute top-0 right-0 m-4">
                <button
                  onClick={handleWishlist}
                  className="text-3xl"
                  style={{
                    color: isInWishlist(selectedProduct)
                      ? "red"
                      : "#999",
                  }}
                >
                  <i
                    className={`bi ${
                      isInWishlist(selectedProduct)
                        ? "bi-heart-fill"
                        : "bi-heart"
                    }`}
                  ></i>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-10">

                <div className="flex justify-center">
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    className="h-[400px] object-contain"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-xl">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-gray-500">
                    {selectedProduct.title}
                  </p>

                  <div className="flex items-center gap-2 my-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                      {selectedProduct.rating} ★
                    </span>
                    <span className="text-gray-500">
                      {selectedProduct.reviews} Ratings
                    </span>
                  </div>

                  <div className="my-3">
                    <span className="text-2xl font-bold">
                      ₹{selectedProduct.price}
                    </span>{" "}
                    <del className="text-gray-400">
                      ₹{selectedProduct.mrp}
                    </del>{" "}
                    <span className="text-yellow-600 font-semibold">
                      ({selectedProduct.discount}% OFF)
                    </span>
                  </div>

                  {/* Size Section */}
                  {selectedProduct.sizes?.length > 0 && (
                    <div className="my-4">
                      <h6 className="font-semibold mb-2">
                        SELECT SIZE
                      </h6>
                      <div className="flex flex-wrap gap-3">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size.label}
                            disabled={size.stock === 0}
                            onClick={() => setSelectedSize(size.label)}
                            className={`w-14 h-14 rounded-full border ${
                              selectedSize === size.label
                                ? "border-black font-bold"
                                : ""
                            }`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleAddToCart}
                      className="bg-red-600 text-white px-6 py-2 rounded"
                    >
                      ADD TO BAG
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded"
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

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4">
        <p>© 2026 Online Shopping. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 text-lg">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-twitter"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-linkedin"></i>
        </div>
      </footer>
    </div>
  );
}