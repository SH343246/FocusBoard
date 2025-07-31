import { useWidgets } from "./Userwidgets"; 
import WeatherWidget from "./Weatherwidgets";
import QuoteWidget from "./Quotewidgets";
import type { UserWidget } from "../habits/types";

export default function WidgetRenderer() {
  const { data: userWidgets = [], isLoading } = useWidgets();

  console.log("userWidgets", userWidgets);


  if (isLoading) return <p>Loading dashboard widgets...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {userWidgets.map((uw: UserWidget) => {
        if (!uw.enabled) return null;

        switch (uw.widget.name.toLowerCase()) {
          case "weather":
            return <WeatherWidget key={uw.id} />;
          case "quote":
           return <QuoteWidget key={uw.id} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
