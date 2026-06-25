"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link
        href="/"
        className="hover:text-[#6F3EFE] transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        href="/all-projects"
        className="hover:text-[#6F3EFE] transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Projects
      </Link>

      <Link
        href={"/"}
        className="hover:text-[#6F3EFE] transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Blog
      </Link>
    </>
  );

  return (
    <nav className="relative z-30 max-w-[1480px] pt-4 font-inter mx-auto w-[95%]">
      {/* Desktop & Mobile Container */}
      <div className="flex items-center justify-between">
        {/* Left Section: Logo + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="rounded-full cursor-pointer w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#6431FE] to-[#B696FF] text-white font-semibold"
          >
            <Image src="/logo.png" alt="logo" width={48} height={48} />
          </Link>
        </div>

        {/* Center Section: Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-gray-500 font-medium">
          {navLinks}
        </div>

        {/* Right Section: Hire Me Button */}
        <div className="flex items-center">
          <a
            href="https://www.linkedin.com/in/al-amin-parvaz1"
            target="_blank"
            className=" p-1 border border-white/5 rounded-[10px] cursor-pointer btnBackground relative inline-flex"
          >
            <span className="bg-gradient-to-r text-white font-semibold from-[#6431FE] to-[#B696FF] transition-all duration-300 px-6 py-2 rounded-[10px] flashEffect relative overflow-hidden">
              Hire Me
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 mt-2 mx-auto w-[95%] transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-6 bg-[#1a1b26]/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl">
          {navLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
