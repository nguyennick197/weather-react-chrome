/*global chrome*/
import { useState, useEffect } from "react";
import { useGeolocation } from "./useGeolocation";
import {
  getAndFormatData,
  isSyncDataValid,
  getFromLocalStorage,
  setLocalStorage,
} from "../../utils/utils";
import { WeatherData } from "../../utils/types";
import { Coordinate } from "../../utils/types";

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const position = useGeolocation();

  async function storeAndSetData(coords: Coordinate | undefined) {
    if (!coords) return;
    const data = await getAndFormatData(coords);
    const newData = {
      ...data,
      timestamp: new Date().getTime(),
    };
    if (chrome && chrome.storage) {
      chrome.storage.local.set(
        {
          weatherData: newData,
        },
        () => console.log("Saved weather data")
      );
    } else {
      setLocalStorage("weatherData", newData);
    }
    setWeatherData(data);
  }

  useEffect(() => {
    console.log("position", position);
    if (weatherData) {
      return;
    }
    if (chrome && chrome.storage) {
      chrome.storage.local.get(["weatherData"], (data) => {
        console.log("Synced data", data);
        if (isSyncDataValid(data)) {
          setWeatherData(data.weatherData);
        } else {
          storeAndSetData(position);
        }
      });
      return;
    }
    const data = getFromLocalStorage("weatherData");
    console.log("local data: ", data);
    if (isSyncDataValid(data)) {
      setWeatherData(data);
    } else {
      storeAndSetData(position);
    }
  }, [position, weatherData]);

  return weatherData;
};
