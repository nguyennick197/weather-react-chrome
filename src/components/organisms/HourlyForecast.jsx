import { useMemo } from "react";
import { P } from "../atoms/Text";
import styled from "@emotion/styled";
import { Container } from "../atoms/Container";
import { Spacer } from "../atoms/Spacer";
import { HourWeatherComponent } from "../molecules/HourWeatherComponent";

const WeatherContainer = styled.div`
  justify-content: center;
  background-image: linear-gradient(to bottom right, #0084c8, #9370db);
  border-radius: 12px;
  padding: 8px 12px;
  height: 110px;
  max-width: 540px;
  overflow-x: scroll;
`;

export function HourlyForecast({
  data,
  sunrise,
  sunset,
  nextSunrise,
  nextSunset,
}) {
  const dataArr = useMemo(() => {
    const sunriseDt = data[0].dt > sunrise ? nextSunrise : sunrise;
    const sunsetDt = data[0].dt > sunset ? nextSunset : sunset;
    const sunriseObject = {
      dt: sunriseDt,
      type: "Sunrise",
    };
    const sunsetObject = {
      dt: sunsetDt,
      type: "Sunset",
    };
    const slicedData = [...data.slice(0, 24)];
    const sunsetIndex = slicedData.findIndex((point) => point.dt > sunsetDt);
    const sunriseIndex = slicedData.findIndex((point) => point.dt > sunriseDt);
    slicedData.splice(sunriseIndex, 0, sunriseObject);
    slicedData.splice(sunsetIndex, 0, sunsetObject);
    return slicedData;
  }, [data, sunrise, sunset, nextSunrise, nextSunset]);

  return (
    <WeatherContainer>
      <P size={12} textAlign="left">
        {" "}
        Hourly Forecast{" "}
      </P>
      <Spacer />
      <Container row>
        {dataArr.map((point, idx) => (
          <div key={idx}>
            <HourWeatherComponent
              point={point}
              sunrise={sunrise}
              sunset={sunset}
              nextSunrise={nextSunrise}
            />
          </div>
        ))}
      </Container>
    </WeatherContainer>
  );
}
