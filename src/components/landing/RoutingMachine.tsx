import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

type PropsType = {
  start: [number, number];
  finish: [number, number] | null;
};

const RoutingMachine: React.FC<PropsType> = ({ start, finish }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !finish) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(finish[0], finish[1])],
      lineOptions: {
        styles: [{ color: "var(--color-base-content)", weight: 6 }]
      },
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: false,
      showAlternatives: false,
      createMarker: (i, waypoint, ) => {
        return L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl: i === 0 ? "/location-crosshairs-solid.svg" : "/pin-location-icon.svg",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          })
        }).bindPopup(i === 0 ? "Start" : "Finish");
      }
    }).addTo(map);

    const controlContainer = document.querySelector(".leaflet-routing-container");
    if (controlContainer) {
      controlContainer.style.display = "none";
    }

    return () => {
      if (!!map) map.removeControl(routingControl);
    };
  }, [map, start, finish]);

  return null;
};

export default RoutingMachine;
