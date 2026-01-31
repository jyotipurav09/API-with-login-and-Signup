import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ResetPassword() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Get email from localStorage
  const email = localStorage.getItem('resetEmail');

  // If email not found → redirect
  useEffect(() => {
    if (!email) {
      toast.error('Please verify OTP first!');
      navigate('/forgotpassword');
    }
  }, [email, navigate]);

  // Submit Handler
  const onSubmit = async (data) => {

    setLoading(true);

    try {

      const response = await axios.post(
        'https://apistudent2.codedonor.in/api/Auth/reset-password',
        {
          email: email,
          newPassword: data.newPassword,
        }
      );

      toast.success('🎉 Password changed successfully!');

      // Clean up
      localStorage.removeItem('resetEmail');

      // Redirect to login page
      navigate('/login');

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        '❌ Password reset failed!'
      );

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Back Button */}
        <button
          onClick={() => navigate('/otp')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
        >
          ⬅ Go Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔑</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Set New Password
          </h1>

          <p className="text-gray-600">
            Create a strong password 💪
          </p>

          <p className="text-sm mt-2 text-green-600 font-medium">
            {email}
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* New Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="********"

              {...register('newPassword', {
                required: 'Password is required 🔒',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                }
              })}

              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"

            />

            {errors.newPassword && (
              <p className="mt-2 text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}

            className={`w-full py-3 rounded-lg font-semibold text-white transition
              ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 active:scale-95'
              }
            `}
          >

            {loading ? 'Saving...' : 'Update Password ✅'}

          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">

          Remembered your password?{' '}

          <button
            onClick={() => navigate('/login')}
            className="text-green-600 font-medium hover:text-green-800"
          >
            Login
          </button>

        </div>

      </div>

    </div>

  );

}

export default ResetPassword;
