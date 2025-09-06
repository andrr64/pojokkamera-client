"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
// CHANGE 1: Import FiChevronDown icon
import { FiSun, FiMoon, FiLogOut, FiChevronDown } from "react-icons/fi";
import { webRoute } from "@/route/web_route";
import { useUserPersist } from "@/lib/hooks/userPersistState";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const menuItems = [
    { menu: "Beranda", link: "/" },
    { menu: "Lensa & Kamera", link: "#section-gear" },
    { menu: "Galeri", link: "#section-gallery" },
    { menu: "Tips & Artikel", link: "#section-articles" },
    { menu: "Kontak", link: "#section-contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false); // mobile menu
    const [userMenuOpen, setUserMenuOpen] = useState(false); // dropdown user
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const userPersist = useUserPersist();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Tutup dropdown jika klik di luar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => setMounted(true), []);

    const handleLogout = () => {
        userPersist.reset();
        toast.success("Logout berhasil");
        setUserMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3">
                    <span className="font-bold text-lg text-gray-800 dark:text-gray-100">LOGO</span>
                </a>

                {/* Desktop Menu */}
                {mounted && (
                    <nav className="hidden md:block">
                        <ul className="font-medium flex space-x-8">
                            {menuItems.map((item) => (
                                <li key={item.menu}>
                                    <a
                                        href={item.link}
                                        className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                                    >
                                        {item.menu}
                                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}

                {/* Right Section */}
                <div className="flex items-center space-x-3 md:space-x-4">
                    {/* Mobile Hamburger */}
                    {mounted && (
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            {isOpen ? "✖" : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            )}
                        </button>
                    )}

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            {resolvedTheme === "dark" ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5 text-gray-800" />}
                        </button>
                    )}

                    {/* User */}
                    {mounted &&
                        (userPersist.username ? (
                            <div className="relative" ref={dropdownRef}>
                                {/* CHANGE 2: Updated the button to include the icon */}
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="hidden md:flex items-center space-x-2 text-gray-800 dark:text-gray-200 font-medium p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span>Hai, {userPersist.username}</span>
                                    <FiChevronDown
                                        className={`transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* Dropdown Desktop */}
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden z-20">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                        >
                                            <FiLogOut className="mr-2" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a
                                href={webRoute.login}
                                className="hidden md:inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-full px-5 py-2 transition-colors duration-200"
                            >
                                Login
                            </a>
                        ))}
                </div>
            </div>

            {/* Mobile Menu */}
            {mounted && (
                <div
                    className={`md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <ul className="flex flex-col p-4 space-y-4">
                        {menuItems.map((item) => (
                            <li key={item.menu}>
                                <a
                                    href={item.link}
                                    className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    {item.menu}
                                </a>
                            </li>
                        ))}
                        {/* Login / Logout Mobile */}
                        {userPersist.username ? (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center w-full text-white bg-blue-700 hover:bg-blue-800 font-semibold text-sm rounded-full px-5 py-2 transition-colors duration-200"
                                >
                                    <FiLogOut className="mr-2" /> Logout
                                </button>
                            </li>
                        ) : (
                            <li>
                                <a
                                    href={webRoute.login}
                                    className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-full px-5 py-2 transition-colors duration-200"
                                >
                                    Login
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
}
