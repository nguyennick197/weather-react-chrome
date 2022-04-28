/*global chrome*/
import { AppContainer } from "../atoms/AppContainer";
import { WeatherCard } from "../molecules/WeatherCard";
import { Spacer } from "../atoms/Spacer";
import { AppHeader } from "../molecules/AppHeader";
import { Container } from "../atoms/Container";
import { SpinningLoader } from "../atoms/SpinningLoader";
import { P } from "../atoms/Text";
import { useWeatherData } from "../hooks/useWeatherData";

export function WeatherApp() {
  const weatherData = useWeatherData();

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
