import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './Components/CartContext';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';

// Lazy loaded page components
const Home = lazy(() => import('./Components/Home'));
const MensSection = lazy(() => import('./Components/MensSection'));
const WomensSection = lazy(() => import('./Components/WomensSection'));
const KidsSection = lazy(() => import('./Components/KidsSection'));
const AccessoriesSection = lazy(() => import('./Components/AccessoriesSection'));
const About = lazy(() => import('./Components/About'));
const Login = lazy(() => import('./Components/Login'));
const Register = lazy(() => import('./Components/Register'));
const CartPage = lazy(() => import('./Components/CartPage'));
const WishlistPage = lazy(() => import('./Components/WishlistPage'));
const SearchPage = lazy(() => import('./Components/SearchPage'));
const ProductDetail = lazy(() => import('./Components/ProductDetail'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mens" element={<MensSection />} />
            <Route path="/womens" element={<WomensSection />} />
            <Route path="/kids" element={<KidsSection />} />
            <Route path="/accessories" element={<AccessoriesSection />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;



