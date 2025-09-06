'use client';

import LoadingOverlay from '@/app/components/LoadingOverlay';
import { AuthService } from '@/lib/api/user/auth.service';
import { useRestfulState } from '@/lib/hooks/restfulState';
import { webRoute } from '@/route/web_route';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const postRegister = useRestfulState();
  const navigate = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== konfirmasiPassword) {
      toast.error('Password dan konfirmasi password tidak sama!');
      return;
    }
    const result = await postRegister.fetchData(
      () => AuthService.register(
        {
          username,
          password,
          email,
          namaLengkap
        }
      )
    )
    if (result.success) {
      toast.success(result.detail);
      navigate.push(webRoute.login);
    } 
  };

  useEffect(() => {
    if (postRegister.error){
      toast.error(postRegister.error);
    }
  }, [postRegister.error])

  return (
    <>
      <LoadingOverlay visible={postRegister.loading} />
      <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 py-8 transition-colors duration-300">
        <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-300">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-4 h-4 rounded-md bg-blue-900"></div>
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              Finnger
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-2">
            Buat Akun
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-8">
            Bergabunglah dan mulai perjalananmu sekarang.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="Contoh: john35x"
                type="text"
                required
              />
            </div>

            {/* Nama lengkap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nama Lengkap
              </label>
              <input
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="Nama lengkap"
                type="text"
                required
              />
            </div>

            {/* Nomor telepon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nomor Telepon (opsional)
              </label>
              <input
                value={nomorTelepon}
                onChange={(e) => setNomorTelepon(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="08xxxxxxxxxx"
                type="tel"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="Email"
                type="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Kata sandi"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-300 hover:text-blue-900"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  value={konfirmasiPassword}
                  onChange={(e) => setKonfirmasiPassword(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Konfirmasi kata sandi"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-300 hover:text-blue-900"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Tombol Daftar */}
            <button
              type="submit"
              className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-full px-6 py-3 transition-colors duration-200"
            >
              Daftar
            </button>
          </form>

          {/* Link Login */}
          <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
            Sudah punya akun?{' '}
            <a
              href={webRoute.login}
              className="text-blue-900 dark:text-blue-400 font-semibold hover:underline"
            >
              Login!
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
