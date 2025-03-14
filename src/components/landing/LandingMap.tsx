"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../navbar/Navbar";
import Toilet, { ToiletType } from "./Toilet";

const userLocationIcon = new L.Icon({
  iconUrl: "/location-crosshairs-solid.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const toiletLocationIcon = new L.Icon({
  iconUrl: "/pin-location-icon.svg",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -36],
})

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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  const [toilets, setToilets] = useState<ToiletType[]>([])
  const [selectedToilet, setSelectedToilet] = useState<ToiletType | null>(null);

  useEffect(() => {
    async function getToilets() {
      // should be asking the backend to get some toilets within a longtitude and latitude bounds
      setToilets([
        {
          id: 1,
          longitude: 151.146661,
          latitude: -33.8781802,
          title: "Times Square Public Restroom",
          rating: 4.2,
          created_at: "2025-03-14T12:30:00Z",
          desc: "Clean and well-maintained restroom in the heart of Times Square."
        },
        {
          id: 2,
          longitude: 151.1278,
          latitude: -33.8074,
          title: "London Underground Toilet",
          rating: 3.2,
          created_at: "2025-03-12T15:45:00Z",
          desc: "Small but functional toilet inside a Tube station."
        },
        {
          id: 3,
          longitude: 151.22868658,
          latitude: -33.898568458,
          title: "Shinjuku Station Restroom",
          rating: 4.8,
          created_at: "2025-03-10T09:00:00Z",
          desc: "Very clean and modern restroom in Shinjuku Station."
        },
        {
          id: 4,
          longitude: 151.22790360,
          latitude: -33.91680088,
          title: "Louvre Museum Toilet",
          rating: 2.0,
          created_at: "2025-03-11T18:20:00Z",
          desc: "Conveniently located inside the Louvre, but often crowded."
        },
        {
          id: 5,
          longitude: 151.2093,
          latitude: -33.8688,
          title: "Sydney Harbour Public Toilet",
          rating: 4.5,
          created_at: "2025-03-13T08:10:00Z",
          desc: "Great view and clean facilities near Sydney Opera House."
        }
      ]);
    }

    getToilets();
  }, []);

  const defaultCenter: [number, number] = [33.8708, 151.2073];

  return (
    <div className="h-screen w-screen z-0">
      <Navbar />
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
            <Popup>You are here!</Popup>
          </Marker>
        )}

        {
          toilets.map((toilet, index) => (
            <Marker
              position={[toilet.latitude, toilet.longitude]}
              key={index} icon={toiletLocationIcon}
              eventHandlers={{
                click: () => {
                  setSelectedToilet(toilet);
                },
              }}>
              <Popup>{toilet.title}</Popup>
            </Marker>
          ))
        }

      </MapContainer>
      <Toilet toilet={selectedToilet} setSelectedToilet={setSelectedToilet} />
    </div>
  );
};

export default LandingMap;
