'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Email: '',
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email('Invalid email format')
        .required('Please input your email'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          'http://localhost:8000/api/auth/register',
          values,
        );
        // Assuming your API returns a token or some kind of user data
        console.log(response.data);
        router.push('/verify'); // Redirect to a different page on success
      } catch (error) {
        setError('Invalid register credentials');
      }
    },
  });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full  p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register for Cheery fresh
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="usernameOrEmail" className="block ">
                Email
              </label>
              <input
                id="Email"
                name="Email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.Email && formik.errors.Email
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.Email && formik.errors.Email ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.Email}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
