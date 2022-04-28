import { useMemo } from "react";
import { P } from "../atoms/Text";
import styled from "@emotion/styled";
import { Container } from "../atoms/Container";
import { Spacer } from "../atoms/Spacer";
import { format } from "date-fns";
import { getIcon, isNight } from "../../utils/utils";
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

export function HourlyForecast({ data, sunrise, sunset, nextSunrise }) {
  const dataArr = useMemo(() => {
    const sunriseObject = {
      dt: data[0].dt > sunrise ? nextSunrise : sunrise,
      type: "Sunrise",
    };
    const sunsetObject = {
      dt: sunset,
      type: "Sunset",
    };
    const slicedData = [...data.slice(0, 24)];
    const sunriseIndex = slicedData.findIndex((point) => point.dt > sunrise);
    const sunsetIndex = slicedData.findIndex((point) => point.dt > sunset);
    slicedData.splice(sunriseIndex + 1, 0, sunriseObject);
    slicedData.splice(sunsetIndex + 1, 0, sunsetObject);
    return slicedData;
  }, [data]);

  return (
    <WeatherContainer>
      <P size={12} textAlign="left">
        {" "}
        Hourly Forecast{" "}
      </P>
      <Spacer />
      <Container row>
        {data.slice(0, 24).map((point) => {
          return (
            <HourWeatherComponent
              point={point}
              sunrise={sunrise}
              sunset={sunset}
              nextSunrise={nextSunrise}
            />
          );
        })}
      </Container>
    </WeatherContainer>
  );
}
