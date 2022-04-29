import { P } from "../atoms/Text";
import { Spacer } from "../atoms/Spacer";
import { Container } from "../atoms/Container";
import { getIcon, getUviLabel } from "../../utils/utils";
import { HR } from "../atoms/HR";
import { WeatherCard } from "../atoms/WeatherCard";

interface WeatherData {
  name: string;
  temp: number;
  group: string;
  feels_like: number;
  humidity: number;
  temp_max: number;
  temp_min: number;
  wind_speed: number;
  iconId: number;
  uvi: number;
}

export function CurrentWeather({
  name,
  temp,
  group,
  temp_max,
  temp_min,
  feels_like,
  wind_speed,
  iconId,
  humidity,
  uvi,
}: WeatherData) {
  const icon = getIcon(iconId, wind_speed);

  const uviLabel = getUviLabel(uvi);

  return (
    <WeatherCard width={300} height={190} justifyContent="center">
      <Container justifyContent="space-between" row>
        <P size={12} textAlign="left">
          {" "}
          Today{" "}
        </P>
        <P size={20}> {name} </P>
      </Container>
      <Container row justifyContent="center" alignItems="center">
        <Container alignItems="center" justifyContent="center">
          <P size={64}> {Math.round(temp)}&deg; </P>
          <P size={16}> Feels like: {Math.round(feels_like)}&deg; </P>
        </Container>
        <Spacer size={32} />
        <Container justifyContent="center" alignItems="center">
          <Spacer />
          <img src={icon} alt={group} width={80} height={80} />
        </Container>
      </Container>
      <Spacer />
      <Container row padding={8}>
        <Container flex={1}>
          <Container row justifyContent="space-between">
            <P> Low/High</P>
            <P>
              {" "}
              {Math.round(temp_min)}&deg;/{Math.round(temp_max)}&deg;
            </P>
          </Container>
          <HR color="white" opacity={0.6} />
          <Container row justifyContent="space-between">
            <P> Humidity </P>
            <P> {humidity}% </P>
          </Container>
        </Container>
        <Spacer size={16} />
        <Container flex={1}>
          <Container row justifyContent="space-between">
            <P> Wind </P>
            <P> {Math.round(wind_speed)} mph</P>
          </Container>
          <HR color="white" opacity={0.6} />
          <Container row justifyContent="space-between">
            <P> UVI </P>
            <P>
              {" "}
              {uvi} {uviLabel}{" "}
            </P>
          </Container>
        </Container>
      </Container>
    </WeatherCard>
  );
}
