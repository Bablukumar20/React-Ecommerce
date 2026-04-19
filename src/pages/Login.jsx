import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaPhoneAlt } from "react-icons/fa";

const Login = () => {
  const { login, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // EMAIL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogle = async () => {
    setLoading(true);
    setError("");

    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GITHUB LOGIN
  const handleGithub = async () => {
    setLoading(true);
    setError("");

    try {
      await loginWithGithub();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">

      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Prime Cart
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        {/* EMAIL LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 outline-none"
          />

          <button
            disabled={loading}
            className="w-full bg-orange-500 py-2 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-5 text-center text-gray-400 text-sm">
          OR CONTINUE WITH
        </div>

        {/* SOCIAL LOGIN ICONS */}
        <div className="flex justify-center gap-6">

          {/* GOOGLE */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="p-3 bg-white rounded-full hover:scale-110 transition"
          >
            <FcGoogle size={24} />
          </button>

          {/* GITHUB */}
          <button
            onClick={handleGithub}
            disabled={loading}
            className="p-3 bg-gray-800 rounded-full hover:scale-110 transition"
          >
            <FaGithub size={22} className="text-white" />
          </button>

          {/* PHONE OTP LINK */}
          <Link to="/phone-login">
            <button className="p-3 bg-green-500 rounded-full hover:scale-110 transition">
              <FaPhoneAlt size={20} />
            </button>
          </Link>

        </div>

        <p className="text-center text-sm mt-5 text-gray-400">
          New user?{" "}
          <Link to="/signup" className="text-orange-400">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;