import { P } from "../atoms/Text";
import styled from "@emotion/styled";
import { Container } from "../atoms/Container";
import { Spacer } from "../atoms/Spacer";
import { format } from "date-fns";
import { getIcon } from "../../utils/utils";

const WeatherContainer = styled.div`
  justify-content: center;
  background-image: linear-gradient(to bottom right, #0084c8, #9370db);
  border-radius: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  height: 110px;
  max-width: 540px;
  overflow-x: scroll;
`;

export function HourlyForecast({ data }) {
  return (
    <WeatherContainer>
      <P size={12} textAlign="left">
        {" "}
        Hourly Forecast{" "}
      </P>
      <Spacer />
      <Container row>
        {data.slice(0, 24).map((point) => {
          const time = format(new Date(point.dt * 1000), "ha");
          const icon = getIcon(point.weather[0].id, point.wind_speed);
          return (
            <Container
              justifyContent="center"
              alignItems="center"
              key={point.dt}
              row
            >
              <Container alignItems="center" justifyContent="center">
                <P size={16}> {time} </P>
                <Spacer size={6} />
                <img
                  src={icon}
                  alt={point.weather[0].main}
                  height={28}
                  width={28}
                />
                <Spacer size={6} />
                <P size={20} style={{ paddingLeft: 5 }}>
                  {" "}
                  {Math.round(point.temp)}&deg;{" "}
                </P>
              </Container>
              <Spacer size={24} />
            </Container>
          );
        })}
      </Container>
    </WeatherContainer>
  );
}
