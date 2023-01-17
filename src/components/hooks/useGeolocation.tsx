import { useState, useEffect } from "react";

interface Coordinate {
  lat: number;
  lon: number;
}

export function useGeolocation() {
  const [userCoords, setUserCoords] = useState<Coordinate>();

  useEffect(() => {
    if (!userCoords) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, [userCoords]);

  return userCoords;
}
