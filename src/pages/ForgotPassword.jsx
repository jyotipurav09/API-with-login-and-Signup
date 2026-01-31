import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'

function ForgotPassword () {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // When "Send OTP" button is pressed
  const onSubmit = async data => {
    setLoading(true) // Start loading animation

    try {
      // Send email to API - This will send OTP to your email
      const response = await axios.post(
        'https://apistudent2.codedonor.in/api/Auth/forgot-password',
        {
          email: data.email
        }
      )

      // Save email in localStorage
      localStorage.setItem('resetEmail', data.email)

      // Show success message
      toast.success('✅ OTP has been sent to your email! Please check 📧')

      // Navigate to OTP verification page
      navigate('/otp')
    } catch (error) {
      // Show error message
      toast.error(
        error.response?.data?.message || '❌ Failed to send OTP!'
      )
    } finally {
      setLoading(false) // Stop loading animation
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md p-8'>

        {/* Back Button */}
        <button
          onClick={() => navigate('/login')}
          className='mb-6 flex items-center text-gray-600 hover:text-gray-800 transition'
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Go Back
        </button>

        {/* Header */}
        <div className='text-center mb-8'>
          <div className='w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-4xl'>📧</span>
          </div>

          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            Forgot Password?
          </h1>

          <p className='text-gray-600'>
            No worries! Enter your email and we will send you an OTP 😊
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

          {/* Email Input */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>

            <input
              type='email'
              placeholder='your@email.com'
              {...register('email', {
                required: 'Email is required 📧',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email'
                }
              })}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-lg'
            />

            {errors.email && (
              <p className='mt-2 text-sm text-red-600 flex items-center'>
                <svg
                  className='w-4 h-4 mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>

                {errors.email.message}
              </p>
            )}
          </div>

          {/* Info Box */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <p className='text-sm text-blue-800'>
              <strong>💡 Tip:</strong> OTP may take 1–2 minutes. Please check your spam folder too.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
            }`}
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Sending OTP...
              </span>
            ) : (
              'Send OTP 🚀'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className='mt-6 text-center text-sm text-gray-600'>
          Remember your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className='text-purple-600 hover:text-purple-800 font-medium'
          >
            Login
          </button>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword
