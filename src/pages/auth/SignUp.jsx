import React from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await signUp(data);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-tr from-blue-600 to-cyan-500 text-white p-10">
          <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
          <p className="text-center text-lg opacity-90">
            Create your account and join our platform today.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <h2 className="md:col-span-2 text-3xl font-bold text-center text-gray-800 mb-4">
              Sign Up
            </h2>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("firstName", { required: "First Name is required" })}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("street", { required: "Street is required" })}
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.street.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                {...register("pincode", {
                  required: "Pincode is required",
                  minLength: { value: 6, message: "Pincode must be 6 digits" },
                  maxLength: { value: 6, message: "Pincode must be 6 digits" },
                })}
              />
              {errors.pincode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white font-semibold transition duration-300 hover:from-indigo-600 hover:to-blue-700 hover:shadow-lg cursor-pointer"
              >
                Sign Up
              </button>
            </div>

            {/* Login Link */}
            <p className="md:col-span-2 text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
