// components/ProductItem.tsx
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";

interface ProductItemProps {
    image: string;
    name: string;
    price: string;
    rating: number; // misal 0-5
    sold: number;
    description: string;
}

export default function ProductItem({
    image,
    name,
    price,
    rating,
    sold,
    description,
}: ProductItemProps) {
    return (
        <div
            className="hover:scale-[1.02] transition-transform duration-200
             bg-white dark:bg-gray-700 
             rounded-xl shadow-md p-3 sm:p-5 flex flex-col 
             transition-colors duration-500"
        >
            <a href="#">
                <img
                    src={image}
                    alt={name}
                    className="w-full aspect-[4/3] object-cover rounded-lg mb-3 sm:mb-4"
                />
            </a>

            {/* Nama produk */}
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-lg md:text-xl mb-1 line-clamp-1">
                {name}
            </h3>

            {/* Rating + sold */}
            <div className="flex items-center text-yellow-400 mb-1 sm:mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                        key={i}
                        className={i < rating ? "" : "text-gray-300 dark:text-gray-600"}
                        size={14}
                    />
                ))}
                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm ml-2">
                    ({sold} sold)
                </span>
            </div>

            {/* Deskripsi */}
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-2 line-clamp-2">
                {description}
            </p>

            {/* Harga */}
            <p className="font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                {price}
            </p>

            {/* Tombol */}
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                <button className="
                    flex-1 border cursor-pointer 
                    border-gray-300 dark:border-gray-600 
                    rounded-md py-2 px-2 text-gray-900 
                    dark:text-gray-100 text-xs sm:text-sm font-medium 
                    flex items-center justify-center space-x-1 sm:space-x-2 
                    hover:bg-gray-100 dark:hover:bg-gray-500 
                    dark:bg-gray-600 transition"
                >
                    <FaHeart size={14} />
                    <span>Wishlist</span>
                </button>
                <button className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-2 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1 sm:space-x-2 transition">
                    <FaShoppingCart size={14} />
                    <span>Buy now</span>
                </button>
            </div>
        </div>
    );
}
