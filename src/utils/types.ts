export interface WeatherData {
  daily: DailyPoint[];
  description: string;
  feels_like: string;
  group: string;
  hourly: HourlyPoint[];
  humidity: number;
  iconId: number;
  name: string;
  sunrise: number;
  sunset: number;
  temp: number;
  temp_max: number;
  temp_min: number;
  timestamp: number;
  timezone: string;
  uvi: number;
  wind_speed: number;
}

export interface WeatherDesc {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Temp {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyTemp extends Temp {
  min: number;
  max: number;
}

export interface SunObj {
  dt: number;
  type: string;
}

export interface WeatherPoint {
  clouds: number;
  dew_point: number;
  dt: number;
  humidity: number;
  pop: number;
  uvi: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherDesc[];
}

export interface DailyPoint extends WeatherPoint {
  feels_like: Temp;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  sunrise: number;
  sunset: number;
  temp: DailyTemp;
}

export interface HourlyPoint extends WeatherPoint {
  clouds: number;
  temp: number;
  type?: string;
}

export interface HourWeatherProps {
  feels_like?: number;
  point: HourlyPoint | SunObj;
  sunrise: number;
  sunset: number;
  nextSunrise: number;
}

export interface CurrentWeatherProps {
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
