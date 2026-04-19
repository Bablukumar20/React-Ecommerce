import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const userCredential = await signup(
        form.email,
        form.password
      );

      await updateProfile(userCredential.user, {
        displayName: form.name,
      });

      navigate("/");
    } catch {
      setError("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0d1a33] border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#08111f] border border-white/10 text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#08111f] border border-white/10 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#08111f] border border-white/10 text-white"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold"
          >
            Sign Up
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-5 text-center">
          Already have account?{" "}
          <Link to="/login" className="text-orange-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;