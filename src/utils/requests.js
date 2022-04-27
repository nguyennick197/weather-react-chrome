export async function getWeatherData(settings) {
  const { lat, lon, units } = settings;
  let url = `${process.env.REACT_APP_API_URL}weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_WEATHER_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw data;
  }
}

export async function getOneCallData(settings) {
  const { lat, lon, units, exclude } = settings;
  let url = `${process.env.REACT_APP_API_URL}onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${process.env.REACT_APP_WEATHER_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw data;
  }
}
