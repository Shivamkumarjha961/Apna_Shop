import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required!");
      return;
    }

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(
        `${apiBase}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");

        // ✅ save user and token
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);

        // 🔥 notify whole app
        window.dispatchEvent(new Event("userChanged"));

        navigate("/");
      } else {
        setMessage(data.message || "Invalid credentials!");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("authToken");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/loginImg.jpg')" }}
    >
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-center text-blue-600 font-bold text-3xl mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {message && (
            <div className="text-center text-red-600 text-sm">
              {message}
            </div>
          )}

          <div className="flex justify-evenly pt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>

            <Link
              to="/register"
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}