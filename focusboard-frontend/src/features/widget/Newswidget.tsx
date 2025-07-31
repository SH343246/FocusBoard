import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

type Props = {
  compact?: boolean;
};

export default function Newswidget({ compact = false }: Props) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        console.error("News fetch failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (!articles.length) return <p>News isn't loading/some other error.</p>;

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white/20 backdrop-blur-md border border-white/30 dark:bg-zinc-800 w-full transition-all duration-200">
      <h3 className="text-xl font-bold mb-2">Top Headlines</h3>
      <ul className="space-y-1">
        {articles.map((a, i) => (
          <li key={i} className="text-sm">
            <a href={a.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
              {compact ? a.title.slice(0, 50) + "…" : a.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
