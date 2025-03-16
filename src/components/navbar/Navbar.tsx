"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSignedIn(false);

    router.push("/");
  };

  const router = useRouter();

  return (
    <div className="absolute top-4 left-4 right-4 bg-base-100 text-black h-16 flex items-center justify-between px-6 rounded-xl shadow-md z-[1000]">
      {/* Left Side: Branding */}
      <Link href="/">
        <span className="text-xl text-primary-content">CONNISEWER</span>
      </Link>

      {/* Center: Search Bar (Visually Centered) */}
      <div className="hidden sm:block absolute left-1/2 -translate-x-1/2">
        <label className="input bg-base-100 text-lg">
          <svg
            className="h-[1em] opacity-50 stroke-accent"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              // stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="text-base-content grow"
            placeholder="Search"
          />
        </label>
      </div>

      {/* Right Side: Login or User Profile */}
      <div className="flex gap-4">
        {signedIn ? (
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => router.push("/auth?type=login")}
              className="btn btn-primary"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/auth?type=register")}
              className="btn btn-secondary"
            >
              Sign Up
            </button>
          </>
        )}
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" value="dark" />

          <svg
            className="swap-off h-6 w-6 fill-accent-content"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-on h-6 w-6 fill-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
}

export default Navbar;
