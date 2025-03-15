"use client";

import { API } from "@/constants";
import { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "login" : "register";
    const body = isLogin
      ? { username: formData.username, password: formData.password }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };

    try {
      const res = await fetch(`${API}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Background Image */}
      <div
        className="w-1/2 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold"
        style={{ backgroundImage: "url('/your-image.jpg')" }}
      >
        Connisewer
      </div>

      {/* Right Side - Login / Register Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl text-base-content font-semibold mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset border border-base-300 p-4 rounded-box">
              <legend className="fieldset-legend">
                {isLogin ? "Login" : "Register"}
              </legend>

              {/* Username */}
              <div className="mt-2">
                <label className="fieldset-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="input w-full text-base-content"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email (Only for Registration) */}
              {!isLogin && (
                <div className="mt-2">
                  <label className="fieldset-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input w-full text-base-content"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Password */}
              <div className="mt-2">
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input w-full text-base-content"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password (Only for Registration) */}
              {!isLogin && (
                <div className="my-2">
                  <div className="divider"></div>
                  <label className="fieldset-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input w-full text-base-content"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </fieldset>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white mt-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Toggle Link */}
          <p className="mt-4 text-center text-base-content text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
