import { useState, useEffect } from "react";

interface Coordinate {
  lat: number;
  lon: number;
}

export function useGeolocation() {
  const [userCoords, setUserCoords] = useState<Coordinate>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  return userCoords;
}
