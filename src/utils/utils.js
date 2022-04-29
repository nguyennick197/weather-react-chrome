import { getOneCallData, reverseGeolocateClient } from "./requests";
import Atmosphere from "../icons/atmosphere.png";
import Clouds from "../icons/clouds.png";
import Sun from "../icons/sun.png";
import Moon from "../icons/moon.png";
import CloudyMoon from "../icons/cloudymoon.png";
import Rain from "../icons/rain.png";
import Storm from "../icons/storm.png";
import Snow from "../icons/winter.png";
import FewClouds from "../icons/suncloud.png";
import Wind from "../icons/wind.png";
import Sunrise from "../icons/sunrise.png";
import Sunset from "../icons/sunset.png";

export function isSyncDataValid(data) {
  if (!data) return false;
  const timestamp = data.weatherData?.timestamp || data.timestamp;
  if (!timestamp) return false;
  const currentDate = new Date();
  if (currentDate.getTime() - 600000 > timestamp) return false;
  return true;
}

export async function getAndFormatData(position) {
  const settings = {
    lat: position.lat,
    lon: position.lon,
    units: "imperial",
    exclude: "minutely,alerts",
  };
  const weatherRequest = getOneCallData(settings);
  const geolocateRequest = reverseGeolocateClient(settings.lat, settings.lon);
  const data = await Promise.all([weatherRequest, geolocateRequest]);
  console.log("Request data", data);
  const weatherData = data[0];
  const locationData = data[1];
  if (weatherData) {
    const { current, daily, hourly, timezone } = weatherData;
    const {
      feels_like,
      humidity,
      temp,
      weather,
      wind_speed,
      sunrise,
      sunset,
      uvi,
    } = current;
    const temp_max = daily[0].temp.max;
    const temp_min = daily[0].temp.min;
    const group = weather[0].main;
    const iconId = weather[0].id;
    const description = weather[0].description;
    let name = "";
    if (locationData) {
      if (locationData.locality && locationData.principalSubdivision) {
        name = `${locationData.locality}, ${locationData.principalSubdivision}`;
      } else {
        name = locationData.locality || locationData.city;
      }
    }
    const newWeatherData = {
      name,
      feels_like,
      humidity,
      temp,
      temp_max,
      temp_min,
      group,
      description,
      daily,
      hourly,
      timezone,
      wind_speed,
      sunrise,
      sunset,
      uvi,
      iconId,
    };
    return newWeatherData;
  }
}

export function getFromLocalStorage(key) {
  if (typeof window === "undefined") return;
  const item = window.localStorage.getItem(key);
  return item && JSON.parse(item);
}

export function setLocalStorage(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function isNight(dt, sunrise, sunset, nextSunrise) {
  if (dt < sunrise || (dt > sunset && dt < nextSunrise)) return true;
  return false;
}

export function getIcon(id, wind_speed = 0, showMoon = false) {
  if (id === "Sunrise") return Sunrise;
  if (id === "Sunset") return Sunset;
  const group = String(id)[0];
  if (group === "2") return Storm;
  else if (group === "3" || group === "5") return Rain;
  else if (group === "6") return Snow;
  else if (group === "7") return Atmosphere;
  else if (wind_speed > 22) return Wind;
  else if (id === 800 && showMoon) return Moon;
  else if (id === 800) return Sun;
  else if (id === 801 && showMoon) return CloudyMoon;
  else if (id === 801) return FewClouds;
  else return Clouds;
}

export function getUviLabel(uvi) {
  if (uvi <= 2) {
    return "(Low)";
  } else if (uvi <= 5) {
    return "(Moderate)";
  } else if (uvi <= 7) {
    return "(High)";
  } else if (uvi <= 10) {
    return "(Very High)";
  } else if (uvi > 10) {
    return "(Extreme)";
  }
}
