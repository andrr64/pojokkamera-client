"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 128,
        behavior: "smooth",
      });
    }
  };

  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id="section-hero"
      className="relative md:min-h-screen w-full flex flex-col items-start font-normal transition-colors duration-500"
    >
      <div className="pt-24 mb-12 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* LEFT SECTION */}
        <div className="flex-1 w-full space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
            Selamat datang di{" "}
            <span className="text-blue-800 dark:text-blue-500">
              Pojok Kamera
            </span>
          </h1>
          <p className="text-2xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300">
            One Stop Shop untuk Fotografi 📷
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
            Dapatkan kamera terbaru, lensa berkualitas, hingga aksesoris fotografi lengkap.
            Belanja mudah, harga bersahabat, dan promo menarik setiap minggu!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() => scrollToSection("#section-gallery")}
              className="bg-blue-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Lihat Galeri
            </button>
            <button
              onClick={() => scrollToSection("#section-articles")}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Baca Tips
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex-1 w-full hidden md:flex justify-center md:justify-end">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/5] rounded-xl shadow-2xl overflow-hidden">
            {/* Skeleton loader */}
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
            )}

            <Image
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Fotografi kamera"
              fill
              className={`object-cover transition-transform transform duration-500 ${
                imgLoaded ? "hover:scale-105" : "scale-100 blur-lg"
              }`}
              onLoadingComplete={() => setImgLoaded(true)}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,..." // bisa generate blurDataURL dari img-nya
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
