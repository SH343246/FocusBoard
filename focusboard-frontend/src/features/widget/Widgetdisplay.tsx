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
      {list.map((uw) => {
        if (!uw?.enabled) return null;
        const key = uw.type ?? uw.widget?.name ?? null;
        const Comp = key ? WidgetRegistry[key] : undefined;//fallback

        if (!Comp) {
          return (
            <div key={uw.id} className="rounded-xl border p-4">
              Unknown widget: {String(key)}
            </div>
          );
        }

        return <Comp key={uw.id} />;
      })}
    </div>
  );
}
