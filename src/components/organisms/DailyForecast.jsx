import { P } from "../atoms/Text";
import styled from "@emotion/styled";
import { Container } from "../atoms/Container";
import { Spacer } from "../atoms/Spacer";
import { format } from "date-fns";
import { getIcon } from "../../utils/utils";
import { HR } from "../atoms/HR";

const WeatherContainer = styled.div`
  justify-content: center;
  background-image: linear-gradient(to bottom right, #0084c8, #9370db);
  border-radius: 12px;
  padding: 8px 12px;
  width: 200px;
  max-height: 180px;
  overflow-y: scroll;
`;

export function DailyForecast({ data }) {
  return (
    <WeatherContainer>
      <P size={12} textAlign="left">
        {" "}
        Daily Forecast{" "}
      </P>
      {data.slice(0, 24).map((point) => {
        const time = format(new Date(point.dt * 1000), "E");
        const icon = getIcon(point.weather[0].id, point.wind_speed);
        return (
          <Container key={point.dt}>
            <HR color="white" opacity={0.3} />
            <Container row alignItems="center">
              <Container width={40}>
                <P size={20}> {time} </P>
              </Container>
              <Spacer />
              <Container width={40}>
                <img
                  src={icon}
                  alt={point.weather[0].main}
                  height={36}
                  width={36}
                />
              </Container>
              <Spacer />
              <Container width={100}>
                <P size={20}>
                  {" "}
                  {Math.round(point.temp.min)}&deg;...{" "}
                  {Math.round(point.temp.max)}&deg;
                </P>
              </Container>
            </Container>
          </Container>
        );
      })}
      <HR color="white" opacity={0.3} />
    </WeatherContainer>
  );
}
