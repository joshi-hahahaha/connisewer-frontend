"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import Navbar from "../navbar/Navbar";
import LandingNav from "./LandingNav";
import ToiletInfo from "./ToiletInfo";
import { PublicToilets, ToiletType } from "./PublicToilets";
import RoutingMachine from "./RoutingMachine";

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
        map.setView([latitude, longitude], 15);
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

const SearchArea = ({ setBounds }: { setBounds: (bounds: [number, number, number, number] | null) => void }) => {
  const map = useMap();
  return (
    <button className="btn btn-primary text-primary-content absolute top-28 left-18 z-[1000]" onClick={() => {
      const bounds = map.getBounds();
      setBounds([
        bounds.getSouth(),
        bounds.getWest(),
        bounds.getNorth(),
        bounds.getEast()
      ])
    }}>
      <svg fill="#000000" height="20" width="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.966 52.966" ><path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21 c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279 C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19	S32.459,40,21.983,40z" /></svg>
      <p>Search This Area</p></button>
  )
}

const LandingMap = () => {
  const defaultCenter = useMemo(() => [-33.8708, 151.2073] as [number, number], []);
  const [userLocation, setUserLocation] = useState<[number, number]>(defaultCenter);
  const [zoom,] = useState(11);
  const [selectedToilet, setSelectedToilet] = useState<ToiletType | null>(null);
  const [routeFinish, setRouteFinish] = useState<[number, number] | null>(null);
  const [showToilets, setShowToilets] = useState<boolean>(true);
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);

  useEffect(() => {
    if (!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setBounds([latitude - 0.1, longitude - 0.15, latitude + 0.1, longitude + 0.15])
      },
        (error) => {
          console.error("Error getting location:", error);
          setBounds([defaultCenter[0] - 0.05, defaultCenter[1] - 0.05, defaultCenter[0] + 0.05, defaultCenter[1] + 0.05]);
        }
      );
    }
  }, [defaultCenter]);

  useEffect(() => {
    setShowToilets(!routeFinish) // hide toilets when routing
  }, [routeFinish]);

  useEffect(() => {
    if (selectedToilet == null) setRouteFinish(null);
  }, [selectedToilet]);

  return (
    <div className="h-screen w-screen z-0">
      <MapContainer
        center={userLocation || defaultCenter}
        zoom={zoom}
        className="h-full w-full"
      >
        <LandingNav setBounds={setBounds} />
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

        {showToilets && !!bounds && <PublicToilets bbox={bounds} setSelectedToilet={setSelectedToilet} />}
        <SearchArea setBounds={setBounds} />
        <RoutingMachine start={userLocation} finish={routeFinish} />
      </MapContainer>
      <ToiletInfo toilet={selectedToilet} setSelectedToilet={setSelectedToilet} setRouteFinish={setRouteFinish} />
    </div>
  );
};

export default LandingMap;
