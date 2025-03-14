"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon for the user's location marker
const userLocationIcon = new L.Icon({
  iconUrl: "/user-location-icon.png", // Ensure this image exists in your public folder
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const LocationUpdater = ({
  setUserLocation,
}: {
  setUserLocation: (loc: [number, number]) => void;
}) => {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]); // Update local state
        setUserLocation([latitude, longitude]); // Update parent state
        map.setView([latitude, longitude], 13);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, [map, setUserLocation]);

  return position ? (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

const LandingMap = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  // Default center (fallback)
  const defaultCenter: [number, number] = [51.505, -0.09];

  return (
    <div className="h-screen w-screen">
      <MapContainer
        center={userLocation || defaultCenter}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationUpdater setUserLocation={setUserLocation} />
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LandingMap;
