"use client";

import React from "react";
import { FaCameraRetro, FaPhotoVideo } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import { SiCnn, SiNikon, SiSony } from "react-icons/si";

const features = [
  { name: "Nikon", icon: <SiNikon size={22} className="text-black dark:text-white" /> },
  { name: "Sony", icon: <SiSony size={22} className="text-black dark:text-white" /> },
];

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

  return (
    <section
      id="section-hero"
      className="relative min-h-screen w-full flex flex-col items-start font-normal transition-colors duration-500"
    >
      <div className="pt-30 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* LEFT SECTION */}
        <div className="flex-1 max-w-xl lg:max-w-2xl space-y-6 text-center md:text-left">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
              Selamat datang di{" "}
              <span className="text-blue-800 dark:text-blue-500">
                Pojok Kamera
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl font-medium text-gray-700 dark:text-gray-300">
              One Stop Shop untuk Fotografi 📷
            </p>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
            Dapatkan kamera terbaru, lensa berkualitas, hingga aksesoris fotografi lengkap.
            Belanja mudah, harga bersahabat, dan promo menarik setiap minggu!
          </p>

          {/* Features */}
          {/* <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            {features.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {item.icon}
                <span className="font-semibold text-gray-700 dark:text-gray-100 text-sm">
                  {item.name}
                </span>
              </div>
            ))}
          </div> */}

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
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-2xl transition-transform transform hover:scale-105 duration-500"
            alt="Fotografi kamera"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
