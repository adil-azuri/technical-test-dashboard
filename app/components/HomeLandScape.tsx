"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import shoppingAnimation from "@/public/lottie/Shopping.json";

const Navbar = () => (
  <nav className="absolute top-0 left-0 right-0 z-20 p-8 flex justify-between items-center max-w-7xl mx-auto">
    <div className="flex items-center space-x-2">
      <div className="text-white text-2xl font-bold border border-white p-2">
        MH
      </div>
    </div>
    <div className="hidden md:flex space-x-8 text-white text-sm font-semibold">
      <a href="#" className="hover:text-amber-200">
        Home
      </a>
      <a href="#" className="hover:text-amber-200">
        About us
      </a>
      <a href="#" className="hover:text-amber-200">
        Course
      </a>
      <a href="#" className="hover:text-amber-200">
        Pricing
      </a>
      <a href="#" className="hover:text-amber-200">
        Contact
      </a>
    </div>

    <Link
      href="/login"
      className="bg-white text-amber-800 font-bold py-2 px-4 rounded-full text-sm hover:bg-amber-100 transition duration-300"
    >
      Login
    </Link>
  </nav>
);

/**
 * Komponen utama untuk halaman beranda dengan desain lanskap.
 * Mencakup latar belakang gradien, animasi, dan konten utama.
 */
const HomeLandscape = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0 z-0 h-4/5 md:h-5/6">
        <div className="absolute inset-0 bg-linear-to-br from-amber-800 via-amber-600 to-amber-500"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-white rounded-full opacity-70 blur-xl"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full shadow-lg shadow-white animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full shadow-lg shadow-white animate-pulse delay-500"></div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-auto z-10"
        viewBox="0 0 1440 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFFFFF"
          d="M0 200C200 100 400 300 700 150C1000 0 1200 250 1440 150V300H0V200Z"
        />
      </svg>

      <Navbar />

      <div className="relative z-20 max-w-7xl mx-auto h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Lottie animationData={shoppingAnimation} loop={true} />
            </div>
          </div>

          <div className="bg-linear-to-br from-amber-500 to-amber-700 text-white p-8 md:p-12 rounded-lg shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              MARKHUB
            </h1>
            <p className="text-amber-100 mb-8 max-w-md">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod.
            </p>

            <Link
              href="/login"
              className="bg-white text-amber-800 font-bold py-3 px-8 rounded-lg hover:bg-amber-100 transition duration-300 shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLandscape;
