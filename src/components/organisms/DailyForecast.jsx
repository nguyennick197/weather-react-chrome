import { P } from "../atoms/Text";
import { HR } from "../atoms/HR";
import { DayWeatherComponent } from "../molecules/DayWeatherComponent";
import { WeatherCard } from "../atoms/WeatherCard";

export function DailyForecast({ data }) {
  return (
    <WeatherCard width={200} height={190} overflowY="scroll">
      <P size={12} textAlign="left">
        {" "}
        Daily Forecast{" "}
      </P>
      {data.map((point, idx) => (
        <div key={idx}>
          <DayWeatherComponent point={point} />
        </div>
      ))}
      <HR color="white" opacity={0.3} />
    </WeatherCard>
  );
}
