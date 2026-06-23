// import { Link } from "react-router-dom";
// import { useCart } from "./CartContext";
// import { useState, useEffect } from "react";

// export default function Navbar() {
//   const { cartItems, wishlistItems } = useCart();
//   const [user, setUser] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const loadUser = () => {
//       try {
//         const storedUser = localStorage.getItem("loggedInUser");
//         setUser(storedUser ? JSON.parse(storedUser) : null);
//       } catch {
//         localStorage.removeItem("loggedInUser");
//         setUser(null);
//       }
//     };

//     loadUser();
//     window.addEventListener("userChanged", loadUser);

//     return () => {
//       window.removeEventListener("userChanged", loadUser);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("loggedInUser");

//     // 🔥 update पूरे app में
//     window.dispatchEvent(new Event("userChanged"));
//   };

//   return (
//     <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

//         {/* Logo */}
//         <h1 className="font-bold text-2xl text-red-600">
//           Apna<span className="text-black">Shop</span>
//         </h1>

//         {/* Mobile menu */}
//         <button
//           className="lg:hidden text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           ☰
//         </button>

//         {/* Menu */}
//         <div className={`${isOpen ? "block" : "hidden"} lg:flex items-center gap-6`}>

//           {/* Links */}
//           <ul className="flex flex-col lg:flex-row gap-5 text-gray-700 font-medium">
//             <li><Link to="/" className="hover:text-red-500">Home</Link></li>
//             <li><Link to="/mens" className="hover:text-red-500">Men</Link></li>
//             <li><Link to="/womens" className="hover:text-red-500">Women</Link></li>
//             <li><Link to="/kids" className="hover:text-red-500">Kids</Link></li>
//             <li><Link to="/accessories" className="hover:text-red-500">Accessories</Link></li>
//             <li><Link to="/about" className="hover:text-red-500">About</Link></li>
//           </ul>

//           {/* Search */}
//           <form className="flex items-center lg:ml-6">
//             <input
//               type="search"
//               placeholder="Search..."
//               className="border px-4 py-2 rounded-l-full focus:ring-2 focus:ring-red-400"
//             />
//             <button className="bg-red-500 text-white px-4 py-2 rounded-r-full">
//               🔍
//             </button>
//           </form>

//           {/* Right side */}
//           <div className="flex items-center gap-6 lg:ml-10">

//             <Link to="/wishlist" className="relative text-lg">
//               ❤️
//               <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
//                 {wishlistItems.length}
//               </span>
//             </Link>

//             <Link to="/cart" className="relative text-lg">
//               🛒
//               <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs px-2 rounded-full">
//                 {cartItems.length}
//               </span>
//             </Link>

//             {/* User */}
//             {user ? (
//               <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
//                 <span className="text-blue-600 font-semibold">
//                   👤 {user.name || user.fullName}
//                 </span>

//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-yellow-400 px-4 py-2 rounded-full font-medium hover:bg-yellow-500"
//               >
//                 Login
//               </Link>
//             )}

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }




import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartItems, wishlistItems } = useCart();

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Close mobile menu when location/route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // 🔥 Load user
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        localStorage.removeItem("loggedInUser");
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  // 🔥 Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("userChanged"));
    setIsOpen(false);
  };

  // 🔍 Search handler
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${searchQuery}`);
    setSearchQuery(""); // clear input
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <h1 className="font-bold text-2xl text-red-600">
          Apna<span className="text-black">Shop</span>
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-2xl cursor-pointer p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menu */}
        <div
          className={`${
            isOpen
              ? "absolute top-full left-0 w-full bg-white shadow-lg p-6 border-t border-gray-100 flex flex-col gap-6"
              : "hidden"
          } xl:flex xl:flex-row xl:static xl:w-auto xl:p-0 xl:shadow-none xl:border-none xl:items-center xl:gap-6`}
        >

          {/* Links */}
          <ul className="flex flex-col xl:flex-row gap-5 text-gray-700 font-medium">
            <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
            <li><Link to="/mens" className="hover:text-red-500 transition">Men</Link></li>
            <li><Link to="/womens" className="hover:text-red-500 transition">Women</Link></li>
            <li><Link to="/kids" className="hover:text-red-500 transition">Kids</Link></li>
            <li><Link to="/accessories" className="hover:text-red-500 transition">Accessories</Link></li>
            <li><Link to="/about" className="hover:text-red-500 transition">About</Link></li>
          </ul>

          {/* 🔍 Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center xl:ml-6"
          >
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-4 py-2 rounded-l-full focus:ring-2 focus:ring-red-400 w-full xl:w-64"
            />
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-r-full hover:bg-red-600 transition cursor-pointer"
            >
              🔍
            </button>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-8 xl:ml-10">

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-lg hover:scale-105 transition">
              ❤️
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {wishlistItems.length}
              </span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-lg hover:scale-105 transition">
              🛒
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            </Link>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                <span className="text-blue-600 font-semibold whitespace-nowrap">
                  👤 {user.name || user.fullName}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-400 px-4 py-2 rounded-full font-medium hover:bg-yellow-500 transition"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}