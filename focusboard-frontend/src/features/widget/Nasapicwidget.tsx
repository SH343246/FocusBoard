import { useEffect, useState } from "react";

type Props = {
  compact?: boolean;
};

export default function NasaWidget({ compact = false }: Props) {
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=M4iQyPo22XfRTBy4W6v668o4XeHz6ubsaN9CIRGV")
      .then(res => res.json())
      .then(data => {
        setPhoto(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("NASA API error", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading NASA photo...</p>;
  if (!photo || !photo.url) return <p>Could not load NASA photo.</p>;

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white/20 backdrop-blur-md border border-white/30 dark:bg-zinc-800 w-full transition-all duration-200">
      <h3 className="text-xl font-bold mb-2">NASA Picture of the Day</h3>
      <img
        src={photo.url}
        alt={photo.title}
        className="rounded-lg mb-2 max-h-48 w-full object-cover"
      />
      {!compact && (
        <>
          <h4 className="font-semibold text-lg">{photo.title}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-3">
            {photo.explanation}
          </p>
        </>
      )}
    </div>
  );
}
