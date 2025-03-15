import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from "leaflet";

// bbox = min Longitude , min Latitude , max Longitude , max Latitude 
export type BboxType = [number, number, number, number]
type PropType = {
  bbox: BboxType
  setSelectedToilet: (toilet: ToiletType | null) => void;
}

const toiletLocationIcon = new L.Icon({
  iconUrl: "/pin-location-icon.svg",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -36],
})

export type ToiletType = {
  id: number;
  title: string,
  lon: number;
  lat: number;
  desc: string;
  reviews: [];
}

export const PublicToilets = ({ bbox, setSelectedToilet }: PropType) => {
  const [toilets, setToilets] = useState<ToiletType[]>([]);

  useEffect(() => {
    console.log(bbox);
    const fetchToilets = async () => {
      const query = `
          [out:json];
          (
            node["amenity"="toilets"](${bbox});
          );
          out;
        `;

      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.elements[0]);
        if (data.elements) {
          setToilets(data.elements.map(x => {
            return {
              id: x.id,
              title: !!x.tags.name ? x.tags.name : x.tags.operator ? x.tags.operator : "Public Toilet" ,
              lon: x.lon,
              lat: x.lat,
              desc: Object.entries(x.tags).map(([k, v]) => `${k}: ${v}`).join(",\n"),
              reviews: []
            };
          }));
        }
      } catch (error) {
        console.error("Error fetching toilet locations:", error);
      }
    };

    fetchToilets();
  }, [bbox]);

  return toilets.map((toilet) => (
    <Marker
      key={toilet.id}
      position={[toilet.lat, toilet.lon]}
      icon={toiletLocationIcon}
      eventHandlers={{
        click: () => {
          setSelectedToilet(toilet);
        },
      }}>
      <Popup>{toilet.title}</Popup>
    </Marker>
  ));
};
