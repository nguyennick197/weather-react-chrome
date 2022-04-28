import { AppContainer } from "../atoms/AppContainer";
import { WeatherCard } from "./WeatherCard";
import { Spacer } from "../atoms/Spacer";
import { Container } from "../atoms/Container";
import { SpinningLoader } from "../atoms/SpinningLoader";
import { P } from "../atoms/Text";
import { useWeatherData } from "../hooks/useWeatherData";
import { DailyForecast } from "./DailyForecast";
import { HourlyForecast } from "./HourlyForecast";

export function WeatherApp() {
  const weatherData = useWeatherData();

  return (
    <AppContainer>
      <Container padding={10} justifyContent="center" alignItems="center">
        {weatherData ? (
          <Container>
            <Container row>
              <WeatherCard {...weatherData} />
              <Spacer size={16} />
              <DailyForecast data={weatherData.daily} />
            </Container>
            <Spacer size={16} />
            <HourlyForecast
              data={weatherData.hourly}
              sunrise={weatherData.sunrise}
              sunset={weatherData.sunset}
              nextSunrise={weatherData.daily[1].sunrise}
            />
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
