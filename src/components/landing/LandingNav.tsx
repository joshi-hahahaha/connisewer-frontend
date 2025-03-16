"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";

function LandingNav({
  setBounds,
}: {
  setBounds: (bounds: [number, number, number, number] | null) => void;
}) {
  const router = useRouter();
  const map = useMap();

  const [searchBarValue, setSearchBarValue] = useState("");
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [searchDropDownValues, setSearchDropDownValues] = useState([]);

  const tempToggle = () => {
    setSignedIn(!signedIn);
  };

  const handleSearch = async () => {
    if (!searchBarValue || searchBarValue === "") return;
    const geocoder = L.Control.Geocoder.nominatim();
    console.log("going to try to geocode: " + geocoder.geocode);

    const res = await geocoder.geocode(searchBarValue);
    console.log(res);
    setSearchDropDownValues(res);
  };

  const handleDropDownSelect = (location) => {
    const poly = L.polygon([
      location.bbox.getSouthEast(),
      location.bbox.getNorthEast(),
      location.bbox.getNorthWest(),
      location.bbox.getSouthWest(),
    ]).addTo(map);
    map.fitBounds(poly.getBounds());

    setBounds([
      location.bbox.getSouth(),
      location.bbox.getWest(),
      location.bbox.getNorth(),
      location.bbox.getEast(),
    ]);

    setTimeout(() => {
      map.removeLayer(poly);
    }, 3000);

    setSearchDropDownValues([]);
  };

  return (
    <div className="absolute top-4 left-4 right-4 bg-base-100 text-black h-16 flex items-center justify-between px-6 rounded-xl shadow-md z-[1000]">
      {/* Left Side: Branding */}
      <Link href="/">
        <span className="text-xl text-primary-content">CONNISEWER</span>
      </Link>

      {/* Center: Search Bar (Geocoder Integrated) */}
      <div className="join">
        <input
          popoverTarget="popover-1"
          className="input join-item w-full"
          placeholder="Search"
          value={searchBarValue}
          onChange={(e) => setSearchBarValue(e.target.value)}
        />
        <button className="btn join-item" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Dropdown appears only when there are values */}
      {searchDropDownValues.length > 0 && (
        <ul
          className="absolute left-0 w-full shadow-lg border mt-1 z-100 bg-white rounded-md overflow-hidden max-h-60 overflow-y-auto "
          id="popover-1"
          style={{ top: "100%", position: "absolute" }}
        >
          {searchDropDownValues.map((x, i) => (
            <li key={i} className="border-b last:border-none">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleDropDownSelect(x)}
              >
                {x.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Right Side: Login or User Profile */}
      <div className="flex gap-4">
        {signedIn ? (
          <button
            onClick={tempToggle}
            className="text-sm text-primary-content hover:text-secondary-content transition"
          >
            User pfp
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
          {/* Icons for theme switching */}
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

export default LandingNav;
