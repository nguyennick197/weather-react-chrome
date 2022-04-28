import { P } from "../atoms/Text";
import { Container } from "../atoms/Container";
import { Spacer } from "../atoms/Spacer";
import { format } from "date-fns";
import { getIcon } from "../../utils/utils";
import { HR } from "../atoms/HR";

export function DayWeatherComponent({ point }) {
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
          <img src={icon} alt={point.weather[0].main} height={36} width={36} />
        </Container>
        <Spacer />
        <Container width={100}>
          <P size={20}>
            {" "}
            {Math.round(point.temp.min)}&deg;... {Math.round(point.temp.max)}
            &deg;
          </P>
        </Container>
      </Container>
    </Container>
  );
}
