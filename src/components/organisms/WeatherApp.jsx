import { AppContainer } from "../atoms/AppContainer";
import { WeatherCard } from "../molecules/WeatherCard";
import { Spacer } from "../atoms/Spacer";
import { AppHeader } from "../molecules/AppHeader";
import { Container } from "../atoms/Container";
import { SpinningLoader } from "../atoms/SpinningLoader";
import { P } from "../atoms/Text";
import { useWeatherData } from "../hooks/useWeatherData";
import { DailyForecast } from "../molecules/DailyForecast";
import { HourlyForecast } from "../molecules/HourlyForecast";

export function WeatherApp() {
  const weatherData = useWeatherData();

  return (
    <AppContainer>
      {/* <AppHeader /> */}
      <Container padding={10} justifyContent="center" alignItems="center">
        {weatherData ? (
          <Container>
            <Container row>
              <WeatherCard {...weatherData} />
              <Spacer size={16} />
              <DailyForecast data={weatherData.daily} />
            </Container>
            <Spacer size={16} />
            <HourlyForecast data={weatherData.hourly} />
          </Container>
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
