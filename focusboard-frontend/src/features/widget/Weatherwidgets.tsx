import { useEffect, useState } from "react";
import api from "../../api/axiosinstance";

const CITY = import.meta.env.VITE_DEFAULT_CITY as string | undefined;

type Props = { compact?: boolean };

type OpenWeather = {
  cod: number | string;
  weather: { description: string }[];
  main: { temp: number };
  wind: { speed: number };
};

export default function WeatherWidget({ compact = false }: Props) {
  const [weather, setWeather] = useState<OpenWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const params: Record<string, string> = CITY ? { city: CITY } : {};
    (async () => {
      try {
        const res = await api.get<OpenWeather>("/widgets/weather", {
          params,
          signal: controller.signal,
        });
        setWeather(res.data);
      } catch {
        setErrMsg("Weather fetch failed");
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (errMsg) return <p>{errMsg}</p>;
  if (!weather || Number(weather.cod) !== 200) return <p>Could not load weather.</p>;

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white/20 backdrop-blur-md border border-white/30 dark:bg-zinc-800 w-full transition-all duration-200">
      <h3 className="text-xl font-bold mb-2">Weather in {CITY || "New York"}</h3>
      {compact ? (
        <p>{weather.main.temp} °C</p>
      ) : (
        <>
          <p>{weather.weather[0]?.description}</p>
          <p>{weather.main.temp} °C</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
}
