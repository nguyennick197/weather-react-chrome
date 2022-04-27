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
import { SpinningLoader } from "../atoms/SpinningLoader";
import { P } from "../atoms/Text";

export function WeatherApp() {
  const [weatherData, setWeatherData] = useState();
  const position = useGeolocation();

  async function storeAndSetData(coords) {
    if (!coords) return;
    const data = await getAndFormatData(coords);
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
    if (chrome && chrome.storage && !weatherData) {
      chrome.storage.sync.get(["weatherData"], (data) => {
        console.log("Synced data", data);
        if (isSyncDataValid(data)) {
          setWeatherData(data.weatherData);
        } else {
          storeAndSetData(position);
        }
      });
    } else if (!weatherData) {
      storeAndSetData(position);
    }
  }, [position?.lat, position?.lon]);

  return (
    <AppContainer>
      <AppHeader />
      <Spacer size={18} />
      <Container padding={10}>
        {weatherData ? (
          <WeatherCard {...weatherData} />
        ) : (
          <Container padding={20} justifyContent="center" alignItems="center">
            <SpinningLoader />
            <Spacer />
            <P size={20} textAlign="center">
              {" "}
              Loading weather data...{" "}
            </P>
          </Container>
        )}
      </Container>
    </AppContainer>
  );
}
