
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState, useEffect } from 'react';

function OTP() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Get email from localStorage
  const email = localStorage.getItem('resetEmail');

  // If email not found → redirect back
  useEffect(() => {
    if (!email) {
      toast.error('❌ Please enter your email first!');
      navigate('/forgotpassword');
    }
  }, [email, navigate]);

  // OTP Verify Submit
  const onSubmit = async (data) => {

    setLoading(true);

    try {

      const response = await axios.post(
        'https://apistudent2.codedonor.in/api/Auth/verify-otp',
        {
          email: email,
          otp: data.otp
        }
      );

      toast.success('✅ OTP verified successfully!');

      // OTP verified → redirect to reset password page
      navigate('/resetpassword');

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        '❌ Invalid OTP! Please try again'
      );

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Back Button */}
        <button
          onClick={() => navigate('/forgot-password')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
        >
          ⬅ Go Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔐</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Verify OTP
          </h1>

          <p className="text-gray-600">
            Enter the OTP sent to your email 📩
          </p>

          <p className="text-sm mt-2 text-purple-600 font-medium">
            {email}
          </p>

        </div>


        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* OTP Input */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>

            <input
              type="text"
              placeholder="123456"
              maxLength={6}

              {...register('otp', {
                required: 'OTP is required 🔢',
                minLength: {
                  value: 6,
                  message: 'OTP must be 6 digits'
                },
                maxLength: {
                  value: 6,
                  message: 'OTP must be 6 digits'
                }
              })}

              className="w-full text-center tracking-widest text-xl px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"

            />

            {errors.otp && (
              <p className="mt-2 text-sm text-red-600">
                {errors.otp.message}
              </p>
            )}

          </div>


          {/* Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            ⏳ OTP is valid only for a few minutes
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}

            className={`w-full py-3 rounded-lg font-semibold text-white transition
              ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
              }
            `}
          >

            {loading ? 'Verifying...' : 'Verify OTP ✅'}

          </button>

        </form>


        {/* Resend */}
        <div className="mt-6 text-center text-sm text-gray-600">

          Didn’t receive OTP?{' '}

          <button
            onClick={() => navigate('/forgot-password')}
            className="text-indigo-600 font-medium hover:text-indigo-800"
          >
            Resend
          </button>

        </div>

      </div>

    </div>

  );

}

export default OTP;
