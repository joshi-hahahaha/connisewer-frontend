import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const BoundsUpdater = ({ setBounds }: { setBounds: (bounds: [number, number, number, number]) => void }) => {
  const map = useMap();

  useEffect(() => {
    const updateBounds = () => {
      const mapBounds = map.getBounds();
      setBounds([
        mapBounds.getSouthWest().lng,
        mapBounds.getSouthWest().lat,
        mapBounds.getNorthEast().lng,
        mapBounds.getNorthEast().lat,
      ]);
    };

    updateBounds(); // Set bounds initially
    map.on("moveend", updateBounds); // Update when map moves

    return () => {
      map.off("moveend", updateBounds);
    };
  }, [map, setBounds]);

  return null;
};
