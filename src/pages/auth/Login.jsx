import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../services/baseurl";
import toast from "react-hot-toast";
import {Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/userService";

const Login = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (values) => {
    console.log(values)
    try {
      const response = await baseUrl.post("Auth/login", values);
      console.log(response.data);
      toast.success("Login successful");
      localStorage.setItem("token", response?.data?.token);
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(message);
      setApiError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* API Error */}
          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? {" "}
          <Link to="./signUp" className="text-red-500 hover:underline"> 
          Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;