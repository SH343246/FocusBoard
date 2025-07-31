import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = import.meta.env.VITE_DEFAULT_CITY;

type Props = {
  compact?: boolean;
};

export default function WeatherWidget({ compact = false }: Props) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Weather fetch failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (!weather || weather.cod !== 200) return <p>Could not load weather.</p>;

  return (

  <div className="rounded-2xl shadow-md p-5 bg-white/20 backdrop-blur-md border border-white/30
 dark:bg-zinc-800 w-full transition-all duration-200">

      <h3 className="text-xl font-bold mb-2">Weather in {CITY}</h3>
      {compact ? (
        <p>{weather.main.temp} °C</p>
      ) : (
        <>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp} °C</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
}
