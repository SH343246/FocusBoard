import { useWidgets } from "./Userwidgets";
import { WidgetRegistry } from "./WidgetRegistry";
type UserWidgetItem = {
  id: number;
  enabled?: boolean;
  type?: string | null;    
  widget?: { name?: string | null } | null; 
};

export default function WidgetRenderer() {
  const { data: userWidgets = [], isLoading } = useWidgets();

  if (isLoading) return <p>Loading dashboard widgets...</p>;

  const list: UserWidgetItem[] = Array.isArray(userWidgets) ? userWidgets : [];

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{userWidgets.map((uw: UserWidget) => {
  if (!uw?.enabled) return null;

  const widgetName = uw?.widget?.name?.toLowerCase?.();
  if (!widgetName) {
    // Optional: log once for debugging
    console.warn("Widget missing name:", uw);
    return null;
  }

  switch (widgetName) {
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
