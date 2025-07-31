import { useEffect, useState } from "react";

type Props = {
  compact?: boolean;
};

export default function CryptoWidget({ compact = false }: Props) {
  const [prices, setPrices] = useState<{ [key: string]: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    )
      .then(res => res.json())
      .then(data => {
        setPrices({
          bitcoin: data.bitcoin.usd,
          ethereum: data.ethereum.usd,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Crypto fetch failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading crypto prices...</p>;
  if (!prices) return <p>Could not load prices.</p>;

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white/20 backdrop-blur-md border border-white/30 dark:bg-zinc-800 w-full transition-all duration-200">
      <h3 className="text-xl font-bold mb-2">Crypto Prices</h3>
      <ul className="space-y-1 text-lg">
        <li>₿ Bitcoin: ${prices.bitcoin.toLocaleString()}</li>
        <li>Ξ Ethereum: ${prices.ethereum.toLocaleString()}</li>
      </ul>
      {!compact && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
      CoinGecko
        </p>
      )}
    </div>
  );
}
