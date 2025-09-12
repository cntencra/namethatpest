"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Burger Icon - Visible on Mobile */}
      <button
        onClick={toggleMenu}
        className="sm:hidden hover:text-red-600 focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Nav Links */}
      <nav className="hidden sm:flex gap-6  font-medium text-base ">
        <Link href="/" className="hover:text-red-600 transition">
          Home
        </Link>
        <Link href="/quiz" className="hover:text-red-600 transition">
          Quiz
        </Link>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-10 left-0 w-48 rounded-md shadow-lg border sm:hidden"
          >
            <ul className="flex flex-col p-4 gap-4 text-lg font-medium">
              <li>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="hover:text-red-600 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  onClick={closeMenu}
                  className="hover:text-red-600 transition"
                >
                  Quiz
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
