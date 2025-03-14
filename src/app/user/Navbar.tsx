"use client";

import React, { useState } from "react";

export function Navbar() {
  // TODO: update this - temporary state
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const tempToggle = () => {
    setSignedIn(!signedIn);
  };

  return (
    <div className="absolute top-4 left-4 right-4 bg-white text-black h-16 flex items-center justify-between px-6 rounded-xl shadow-md z-[1000]">
      {/* Left Side: Branding */}
      <a href="/"><span className="text-xl">CONNISEWER</span></a>


      {/* Center: Search Bar (Visually Centered) */}
      {/* <div className="absolute left-1/2 -translate-x-1/2">
        <label className="input bg-white text-lg">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" placeholder="Search" />
        </label>
      </div> */}

      {/* Right Side: Login or User Profile */}
      {signedIn ? (
        <button
          onClick={tempToggle}
          className="text-sm text-gray-600 hover:text-black transition"
        >
          User pfp
        </button>
      ) : (
        <button
          onClick={tempToggle}
          className="text-sm text-gray-600 hover:text-black transition"
        >
          Login / Register
        </button>
      )}
    </div>
  );
}
