import { P } from "../atoms/Text";
import { Container } from "../atoms/Container";
import { Spacer } from "../atoms/Spacer";
import { format } from "date-fns";
import { getIcon, isNight } from "../../utils/utils";
import { HourWeatherProps, HourlyPoint } from "../../utils/types";

export function HourWeatherComponent({
  point,
  sunrise,
  sunset,
  nextSunrise,
}: HourWeatherProps) {
  const type = point.type;
  const timeFormat = type ? "h:mma" : "ha";
  const time = format(new Date(point.dt * 1000), timeFormat);
  const showMoon = isNight(point.dt, sunrise, sunset, nextSunrise);
  const pointId = type || (point as HourlyPoint).weather[0].id;
  const icon = getIcon(pointId, (point as HourlyPoint).wind_speed, showMoon);
  const label = type || Math.round((point as HourlyPoint).temp);

  return (
    <Container justifyContent="center" alignItems="center" row>
      <Container alignItems="center" justifyContent="center">
        <P size={16}> {time} </P>
        <Spacer size={6} />
        <img src={icon} alt="Weather Icon" height={28} width={28} />
        <Spacer size={6} />
        {type ? (
          <P size={20}>{type}</P>
        ) : (
          <P size={20} style={{ paddingLeft: 5 }}>
            {" "}
            {label}&deg;{" "}
          </P>
        )}
      </Container>
      <Spacer size={24} />
    </Container>
  );
}
