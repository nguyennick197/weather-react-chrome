import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { getWeatherData } from "../../utils/requests";
import { Spacer } from "../atoms/Spacer";

const AppContainer = styled.div`
  background-color: grey;
  min-height: 100vh;
  width: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export function WeatherApp() {
  const [weatherData, setWeatherData] = useState<any>();

  async function getAndFormatWeather() {
    const settings = {
      lat: 35,
      lon: 139,
      units: "imperial",
    };
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

  useEffect(() => {
    getAndFormatWeather();
  }, []);

  return (
    <AppContainer>
      <div>
        {weatherData && (
          <div>
            <h3> {weatherData.name} </h3>
            <h2> {weatherData.temp}&deg; </h2>
            <Spacer size={12} />
            <h2> {weatherData.group} </h2>
          </div>
        )}
      </div>
    </AppContainer>
  );
}
