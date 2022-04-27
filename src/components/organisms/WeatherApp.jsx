/*global chrome*/
import { useState, useEffect } from "react";
import { getAndFormatData } from "../../utils/utils";
import { AppContainer } from "../atoms/AppContainer";
import { useGeolocation } from "../../utils/hooks";
import { WeatherCard } from "../molecules/WeatherCard";
import { Spacer } from "../atoms/Spacer";
import { AppHeader } from "../molecules/AppHeader";
import { Container } from "../atoms/Container";
import { isSyncDataValid } from "../../utils/utils";

export function WeatherApp() {
  const [weatherData, setWeatherData] = useState();
  const position = useGeolocation();

  async function storeAndSetData(position) {
    const data = await getAndFormatData(position);
    if (chrome && chrome.storage) {
      chrome.storage.sync.set(
        {
          weatherData: {
            ...data,
            timestamp: new Date().getTime(),
          },
        },
        () => console.log("Saved weather data")
      );
    }
    setWeatherData(data);
  }

  useEffect(() => {
    console.log("position", position);
    if (chrome && chrome.storage) {
      chrome.storage.sync.get(["weatherData"], (data) => {
        if (isSyncDataValid(data)) {
          setWeatherData(data.weatherData);
        } else {
          storeAndSetData(position);
        }
      });
    } else {
      storeAndSetData(position);
    }
  }, [position?.lat, position?.lon]);

  return (
    <AppContainer>
      <AppHeader />
      <Spacer size={18} />
      <Container padding={10}>
        {weatherData && <WeatherCard {...weatherData} />}
      </Container>
    </AppContainer>
  );
}
