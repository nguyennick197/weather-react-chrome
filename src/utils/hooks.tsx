import { useState, useEffect } from "react";

// https://usehooks.com/useDebounce/
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

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
