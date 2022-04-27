import { getOneCallData, reverseGeolocateClient } from "./requests";

export function isSyncDataValid(data) {
  if (!data || !data?.weatherData?.timestamp) return false;
  const currentDate = new Date();
  if (currentDate.getTime() - 600000 > data.weatherData.timestamp) return false;
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
  console.log(data);
  const weatherData = data[0];
  const locationData = data[1];
  if (weatherData) {
    const { current, daily, hourly } = weatherData;
    const { feels_like, humidity, temp, weather } = current;
    const temp_max = daily[0].temp.max;
    const temp_min = daily[0].temp.min;
    const group = weather[0].main;
    const description = weather[0].description;
    let name = "";
    if (locationData) {
      name = locationData.locality || locationData.city;
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
