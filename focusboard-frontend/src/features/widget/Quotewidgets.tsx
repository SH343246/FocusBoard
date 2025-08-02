import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
type Quote = {
  text: string;
  author: string;
};

type Props = {
  compact?: boolean;
};

export default function QuoteWidget({ compact = false }: Props) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/widgets/quotes`)
    .then(res => res.json())
    .then(data => {
      setQuote({ text: data.text, author: data.author });
      setLoading(false);
    })
    .catch(err => {
      console.error("Quote fetch failed", err);
      setLoading(false);
    });
}, []);

if (!quote) return <p>Could not load quote.</p>;
if (loading) return <p>Loading quote...</p>;


  return (
<div className="rounded-xl shadow p-4 bg-white/20 backdrop-blur-md border border-white/30
 dark:bg-zinc-800 w-full">

      <h3 className="text-lg font-semibold mb-2">Daily Quote</h3>
      {compact ? (
        <blockquote className="italic text-sm truncate">"{quote.text}"</blockquote>
      ) : (
        <>
          <blockquote className="italic">"{quote.text}"</blockquote>
          <p className="text-sm text-right mt-2">— {quote.author}</p>
        </>
      )}

    

    </div>

    
  );
}

