import { useEffect, useState } from "react";

type Props = {
  compact?: boolean;
};

export default function JokeWidget({ compact = false }: Props) {
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = () => {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(res => res.json())
      .then(data => {
        setJoke({ setup: data.setup, punchline: data.punchline });
        setLoading(false);
      })
      .catch(err => {
        console.error("Joke fetch failed", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) return <p>Loading joke...</p>;
  if (!joke) return <p>Could not load</p>;

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white/20 backdrop-blur-md border border-white/30 dark:bg-zinc-800 w-full transition-all duration-200">
      <h3 className="text-xl font-bold mb-2">Random Joke</h3>
      <p className="font-semibold">{joke.setup}</p>
      {!compact && <p className="mt-1 text-gray-700 dark:text-gray-300">{joke.punchline}</p>}
    </div>
  );
}
