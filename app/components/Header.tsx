"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiLogOut, FiChevronDown, FiUser } from "react-icons/fi";
import { webRoute } from "@/route/web_route";
import { useUserPersist } from "@/lib/hooks/userPersistState";
import toast from "react-hot-toast";
import { IconType } from "react-icons";

// Define a type for menu items for better type safety
type MenuItem = {
    menu: string;
    link: string;
};

// Define a type for user dropdown menu items
type UserMenuItem = {
    label: string;
    icon: IconType;
    onClick: (actions: { onLogout: () => void }) => void;
};

// --- CHANGE 1: User dropdown menu items are defined as a constant array ---
// This makes it easy to add more items like "Profile" or "Settings" later.
const userMenuItems: UserMenuItem[] = [
    {
        label: "Logout",
        icon: FiLogOut,
        onClick: ({ onLogout }) => onLogout(),
    },
    // Example: To add a "Profile" link, you would just add a new object here.
    // {
    //   label: "Profile",
    //   icon: FiUser,
    //   onClick: () => { /* navigate to profile page */ }
    // },
];

// Menu items for the main navigation
const menuItems: MenuItem[] = [
    { menu: "Beranda", link: "/" },
    { menu: "Lensa & Kamera", link: "#section-gear" },
    { menu: "Galeri", link: "#section-gallery" },
    { menu: "Tips & Artikel", link: "#section-articles" },
    { menu: "Kontak", link: "#section-contact" },
];

// Sub-component for the Logo
const Logo = () => (
    <a href="/" className="flex items-center space-x-3">
        <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
            LOGO
        </span>
    </a>
);

// Sub-component for the Desktop Navigation
const DesktopNav = ({ items }: { items: MenuItem[] }) => (
    <nav className="hidden md:block">
        <ul className="font-medium flex space-x-8">
            {items.map((item) => (
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
);

// --- CHANGE 2: Updated UserMenu to dynamically render items ---
// Sub-component for the User Dropdown Menu
const UserMenu = ({ user, onLogout }: { user: any; onLogout: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleItemClick = (item: UserMenuItem) => {
        item.onClick({ onLogout });
        setIsOpen(false); // Close dropdown after clicking an item
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden md:flex items-center space-x-2 text-gray-800 dark:text-gray-200 font-medium p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <span>Hai, {user.username}</span>
                <FiChevronDown
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden z-20">
                    {userMenuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleItemClick(item)}
                            className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            <item.icon className="mr-3 h-4 w-4" /> {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


// Sub-component for the Mobile Menu
const MobileMenu = ({
    isOpen,
    items,
    user,
    onLogout,
}: {
    isOpen: boolean;
    items: MenuItem[];
    user: any;
    onLogout: () => void;
}) => (
    <div
        className={`md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
    >
        <ul className="flex flex-col p-4 space-y-4">
            {user.username && (
                <li>
                    <p className="font-bold">{`Hai, ${user.username}!`}</p>
                    <div className="border-t border-gray-100 mt-2"></div>
                </li>
            )}
            {items.map((item) => (
                <li key={item.menu}>
                    <a
                        href={item.link}
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                        {item.menu}
                    </a>
                </li>
            ))}
            {user.username ? (
                <li>
                    <button
                        onClick={onLogout}
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
);

// Main Header Component
export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const userPersist = useUserPersist();

    useEffect(() => setMounted(true), []);

    const handleLogout = () => {
        userPersist.reset();
        toast.success("Logout berhasil");
    };

    if (!mounted) {
        return null; // Or a placeholder/skeleton loader
    }

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <Logo />
                <div className="hidden md:flex flex-grow justify-center">
                    <DesktopNav items={menuItems} />
                </div>

                {/* Right Section Actions */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <button
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        {resolvedTheme === "dark" ? (
                            <FiSun className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <FiMoon className="w-5 h-5 text-gray-800" />
                        )}
                    </button>

                    {userPersist.username ? (
                        <UserMenu user={userPersist} onLogout={handleLogout} />
                    ) : (
                        <a
                            href={webRoute.login}
                            className="hidden md:inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-full px-5 py-2 transition-colors duration-200"
                        >
                            Login
                        </a>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        {isMobileMenuOpen ? (
                            "✖"
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                items={menuItems}
                user={userPersist}
                onLogout={handleLogout}
            />
        </header>
    );
}
