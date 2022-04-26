import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { getWeatherData } from "../../utils/requests";
import cityList from "../../utils/city_list.json";
import { SearchInput } from "../molecules/SearchInput";
import { AppContainer } from "../atoms/AppContainer";

export function WeatherApp() {
  const [weatherData, setWeatherData] = useState();

  async function getAndFormatWeather() {
    const settings = {
      lat: 35,
      lon: 139,
      units: "imperial",
    };
    // const data = await getWeatherData(settings);
    // console.log(data);
    // if (data) {
    //   const { name, weather, main } = data;
    //   const { feels_like, humidity, temp, temp_max, temp_min } = main;
    //   const group = weather[0].main;
    //   const description = weather[0].description;
    //   const newWeatherData = {
    //     name,
    //     feels_like,
    //     humidity,
    //     temp,
    //     temp_max,
    //     temp_min,
    //     group,
    //     description,
    //   };
    //   setWeatherData(newWeatherData);
    // }
  }

  useEffect(() => {
    const cities = cityList.filter((c) => c.name.includes("Brooklyn"));
    console.log("cities: ", cities);
  }, []);

  useEffect(() => {
    getAndFormatWeather();
  }, []);

  return (
    <AppContainer>
      <div>
        <SearchInput />
        {weatherData && (
          <div>
            <h3> {weatherData.name} </h3>
            <h2> {weatherData.temp}&deg; </h2>
            <h3> {weatherData.group} </h3>
          </div>
        )}
      </div>
    </AppContainer>
  );
}
