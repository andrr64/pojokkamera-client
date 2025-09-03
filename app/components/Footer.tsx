"use client";

import React from "react";
import Image from "next/image";
// import whiteLogo from "@/public/pojokkamera-white.svg"; // logo khusus pojok kamera

// Data menu
const exploreLinks = [
    { menu: "Lensa & Kamera", link: "#section-gear" },
    { menu: "Galeri", link: "#section-gallery" },
    { menu: "Tips & Artikel", link: "#section-articles" },
    { menu: "Kontak", link: "#section-contact" },
];

const legalLinks = [
    { menu: "Kebijakan Privasi", link: "#" },
    { menu: "Syarat & Ketentuan", link: "#" },
    { menu: "Disclaimer", link: "#" },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 transition-colors duration-300">
            <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-0">

                {/* Logo & Deskripsi */}
                <div className="md:flex-1 max-w-xs">
                    <div className="flex items-center gap-2 mb-6">
                        {/* <Image
                            src={whiteLogo}
                            alt="Pojok Kamera Logo"
                            className="w-8 h-8"
                            width={32}
                            height={32}
                        /> */}
                        <span className="text-lg font-bold tracking-wide text-white">
                            Pojok Kamera
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-8 text-gray-400">
                        Pojok Kamera adalah ruang bagi para pecinta fotografi.  
                        Temukan ulasan gear, tips fotografi, serta inspirasi karya dari berbagai sudut pandang.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-6 text-lg mb-10">
                        <a aria-label="YouTube" className="hover:text-red-500 transition-colors" href="#"><i className="fab fa-youtube"></i></a>
                        <a aria-label="Instagram" className="hover:text-pink-500 transition-colors" href="#"><i className="fab fa-instagram"></i></a>
                        <a aria-label="Facebook" className="hover:text-blue-500 transition-colors" href="#"><i className="fab fa-facebook-f"></i></a>
                    </div>

                    {/* Back to Top Button */}
                    <button
                        className="flex items-center gap-2 border border-gray-600 px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded hover:bg-gray-700 hover:text-white transition-all"
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <i className="fas fa-arrow-up"></i>
                        Kembali ke Atas
                    </button>
                </div>

                {/* Menu Navigasi */}
                <div className="flex flex-col sm:flex-row gap-12">
                    <div>
                        <h3 className="text-white font-semibold mb-4">Jelajahi</h3>
                        <ul className="space-y-3 text-sm">
                            {exploreLinks.map((item) => (
                                <li key={item.menu}>
                                    <a
                                        href={item.link}
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        {item.menu}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            {legalLinks.map((item) => (
                                <li key={item.menu}>
                                    <a
                                        href={item.link}
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        {item.menu}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 py-6 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Pojok Kamera by Andreas. Semua hak cipta dilindungi.
            </div>
        </footer>
    );
}
