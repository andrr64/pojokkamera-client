'use client';

import LoadingOverlay from '@/app/components/LoadingOverlay';
import { AuthService } from '@/lib/api/user/auth.service';
import { webRoute } from '@/route/web_route';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    const result = await AuthService.login({ email, password });
    setLoading(false);


    if (!result.success) {
      toast.error(result.detail);
    } else {

    }
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <LoadingOverlay visible={loading} />
      <main
        suppressHydrationWarning
        className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 py-8 transition-colors duration-300"
      >
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-300">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-4 h-4 rounded-md bg-blue-600"></div>
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              Finnger
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-8">
            Senang melihatmu lagi di tempat spesialmu.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Email"
                type="email"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="mb-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                Kata Sandi
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md pr-12 pl-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" // Added pr-12
                placeholder="Kata sandi"
                type={showPassword ? 'text' : 'password'}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center pt-8 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <label className="flex items-center space-x-2 select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-blue-600 text-blue-600 focus:ring-blue-600"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="text-gray-900 dark:text-gray-200 text-xs font-normal">
                  Ingat saya
                </span>
              </label>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Lupa kata sandi?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-full px-6 py-3 transition-colors duration-200"
            >
              Masuk
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
            Belum punya akun?{' '}
            <a
              href={webRoute.register}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Daftar
            </a>
          </p>
        </div>
      </main>
    </>
  );
}