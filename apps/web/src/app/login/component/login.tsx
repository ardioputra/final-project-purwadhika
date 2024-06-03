"use client"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required('Username or Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/auth/login',
          values,
        );
        // Assuming your API returns a token or some kind of user data
        console.log(response.data);
        router.push('/verify'); // Redirect to a different page on success
      } catch (error) {
        setError('Invalid login credentials');
      }
    },
  });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full  p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="usernameOrEmail" className="block ">
                Username or Email
              </label>
              <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usernameOrEmail}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.usernameOrEmail &&
                  formik.errors.usernameOrEmail
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.usernameOrEmail &&
              formik.errors.usernameOrEmail ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.usernameOrEmail}
                </p>
              ) : null}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
