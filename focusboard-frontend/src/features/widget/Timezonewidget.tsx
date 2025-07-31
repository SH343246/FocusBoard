import { useEffect, useState } from "react";

const TIMEZONE = "America/New_York"; 
const API_URL = `https://worldtimeapi.org/api/timezone/America/New_York`; 

type Props = {
  compact?: boolean;
};

export default function Timezoneticker({ compact = false }: Props) {
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTime = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const date = new Date(data.datetime);
        setTime(date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
        setLoading(false);
      })
      .catch(err => {
        console.error("Time API failed", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTime();
    const interval = setInterval(fetchTime, 60000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading time...</p>;
  if (!time) return <p>Could not load time.</p>;

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white/20 backdrop-blur-md border border-white/30 dark:bg-zinc-800 w-full transition-all duration-200">
      <h3 className="text-xl font-bold mb-2">{TIMEZONE.replace("_", " ")}</h3>
      <p className="text-lg font-mono">{time}</p>
      {!compact && <p className="text-sm text-gray-600 dark:text-gray-300">Updated every minute</p>}
    </div>
  );
}
