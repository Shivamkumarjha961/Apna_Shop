import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(
        `${apiBase}/api/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Error connecting to the server!");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('images/loginImg.jpg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-center text-blue-600 font-bold text-3xl mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email address
            </label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Message */}
          {message && (
            <div className="text-red-600 text-center text-sm">
              {message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-evenly pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>

            <Link
              to="/login"
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}