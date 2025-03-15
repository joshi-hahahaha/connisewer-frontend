"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../navbar/Navbar";
import ToiletInfo from "./ToiletInfo";
import { PublicToilets, ToiletType } from "./PublicToilets";

const userLocationIcon = new L.Icon({
  iconUrl: "/location-crosshairs-solid.svg",
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
        setPosition([latitude, longitude]);
        setUserLocation([latitude, longitude]);
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

  const defaultCenter: [number, number] = [33.8708, 151.2073];
  const [userLocation, setUserLocation] = useState<[number, number]>(defaultCenter);
  const [zoom, ] = useState(10);
  const [selectedToilet, setSelectedToilet] = useState<ToiletType | null>(null);

  return (
    <div className="h-screen w-screen z-0">
      <Navbar />
      <MapContainer
        center={userLocation || defaultCenter}
        zoom={zoom}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationUpdater setUserLocation={setUserLocation} />
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        )}

        <PublicToilets bbox={[userLocation[0] - 0.08, userLocation[1] - 0.15, userLocation[0] + 0.08, userLocation[1] + 0.15]} setSelectedToilet={setSelectedToilet} />
      </MapContainer>
      <ToiletInfo toilet={selectedToilet} setSelectedToilet={setSelectedToilet} />
    </div>
  );
};

export default LandingMap;
