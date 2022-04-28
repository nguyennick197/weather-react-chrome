import { P } from "../atoms/Text";
import styled from "@emotion/styled";
import { HR } from "../atoms/HR";
import { DayWeatherComponent } from "../molecules/DayWeatherComponent";

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
        return <DayWeatherComponent point={point} />;
      })}
      <HR color="white" opacity={0.3} />
    </WeatherContainer>
  );
}
