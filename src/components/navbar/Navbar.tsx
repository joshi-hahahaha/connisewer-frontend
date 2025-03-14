"use client";

import React from "react";

function Navbar() {
  return (
    <div className="absolute top-4 left-4 right-4 bg-white text-black h-12 flex items-center justify-between px-6 rounded-xl shadow-md z-[1000]">
      <span className="font-bold text-lg">connisewer</span>
      <button className="text-sm text-gray-600 hover:text-black transition">
        Login / Register
      </button>
    </div>
  );
}

export default Navbar;
