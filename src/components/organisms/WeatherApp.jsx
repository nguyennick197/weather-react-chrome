import { useState, useEffect } from "react";
import { getWeatherData } from "../../utils/requests";
import cityList from "../../utils/city_list.json";
import { SearchInput } from "../molecules/SearchInput";
import { AppContainer } from "../atoms/AppContainer";
import { useGeolocation } from "../../utils/hooks";
import { WeatherCard } from "../molecules/WeatherCard";
import { Spacer } from "../atoms/Spacer";

export function WeatherApp() {
  const [weatherData, setWeatherData] = useState();
  const [cityOptions, setCityOptions] = useState();

  const position = useGeolocation();

  async function getAndFormatWeather(settings) {
    const data = await getWeatherData(settings);
    console.log(data);
    if (data) {
      const { name, weather, main } = data;
      const { feels_like, humidity, temp, temp_max, temp_min } = main;
      const group = weather[0].main;
      const description = weather[0].description;
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
      setWeatherData(newWeatherData);
    }
  }

  // useEffect(() => {
  //   const options = cityList.map(c => {
  //     let label = c.name
  //     if (c.state) label += `, ${c.state}`
  //     label += `, ${c.country}`
  //     const id = c.id
  //     const value = c.coord
  //     return {
  //       id,
  //       label,
  //       value
  //     }
  //   })
  //   setCityOptions(options)
  // }, []);

  useEffect(() => {
    console.log("position", position);
    if (position) {
      const settings = {
        lat: position.lat,
        lon: position.lon,
        units: "imperial",
      };
      getAndFormatWeather(settings);
    }
  }, [position?.lat, position?.lon]);

  return (
    <AppContainer>
      <SearchInput />
      <Spacer size={24} />
      {weatherData && <WeatherCard {...weatherData} />}
    </AppContainer>
  );
}
