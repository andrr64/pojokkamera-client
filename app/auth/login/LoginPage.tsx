'use client';

import { webRoute } from '@/route/web_route';
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data login:', { email, password });
    alert(`Login berhasil dengan email: ${email}`);
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 py-24 transition-colors duration-300">
      {/* Card Form */}
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
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Email"
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Kata sandi"
            type="password"
            required
          />

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
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-full px-6 py-3 transition-colors duration-200"
          >
            Masuk
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
          Belum punya akun?{' '}
          <a
            href={webRoute.register}
            className="text-green-600 dark:text-green-400 font-semibold hover:underline"
          >
            Daftar
          </a>
        </p>
      </div>
    </main>
  );
}
