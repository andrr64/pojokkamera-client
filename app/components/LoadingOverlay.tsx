"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
    visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <motion.div
                        className="flex flex-col items-center space-y-4"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Siri style wave loader */}
                        <div className="flex space-x-1">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.span
                                    key={i}
                                    className="w-1.5 h-6 bg-white dark:bg-gray-300 rounded-full"
                                    animate={{
                                        scaleY: [0.5, 1.5, 0.5],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.8,
                                        delay: i * 0.15,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>

                        <span className="text-sm font-medium text-white dark:text-gray-200">
                            Loading...
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
