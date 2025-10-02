import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,   

} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useWidgets } from "./Userwidgets";
import { useUpdateWidgetOrder } from "./Updatewidgetorder";
import { Updatewidgets } from "./Updatewidgets";

import WeatherWidget from "./Weatherwidgets";
import QuoteWidget from "./Quotewidgets";
import Timezoneticker from "./Timezonewidget";
import Newswidget from "./Newswidget";
import CryptoWidget from "./Cryptowidget";
import NasaWidget from "./Nasapicwidget";
import JokeWidget from "./Jokewidget";


const map = {
  weather: WeatherWidget,
  quote: QuoteWidget,
  timezone: Timezoneticker,
  news: Newswidget,
  crypto: CryptoWidget,
  nasa: NasaWidget,
  joke: JokeWidget,
} as const;

function Card({ id, children }: { id: number; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className="w-full min-w-0"
    >
      {children}
    </div>
  );
}

export default function EnabledWidgets() {
  const { data = [], refetch } = useWidgets();
  const { mutate: updateOrder } = useUpdateWidgetOrder();
  const { mutate: updateWidget } = Updatewidgets();

  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const [order, setOrder] = useState<number[]>([]); 
  const enabled = useMemo(
    () =>
      data
        .filter((u) => u.enabled)
        .sort((a, b) => {
          const aCollapsed = collapsed[a.id] ? 1 : 0;
          const bCollapsed = collapsed[b.id] ? 1 : 0;
          const posA = a.position ?? 0;
          const posB = b.position ?? 0;
          return aCollapsed - bCollapsed || posA - posB;
        }),
    [data, collapsed]
  );

    const disabled = data.filter((w) => !w.enabled);
  useEffect(() => {
    setOrder(enabled.map((w) => w.id));
  }, [enabled]);
const sensors = useSensors(useSensor(PointerSensor));

  function onDragEnd(ev: DragEndEvent) {
    const { active, over } = ev;
    if (!over || active.id === over.id) return;

    const oldIdx = order.indexOf(active.id as number);
    const newIdx = order.indexOf(over.id as number);
    const newOrder = arrayMove(order, oldIdx, newIdx);
    setOrder(newOrder);
const updates: { id: number; position: number }[] = newOrder.map(
  (userWidgetId, i) => ({ id: userWidgetId, position: i })
);

    updateOrder(updates);
  }

  const toggleCollapse = (id: number) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* const restoreHidden = (id: number) => {
    const widget = data.find((w) => w.widget.id === id);
    if (widget) {
      updateWidget(
        { id: widget.id, enabled: true },
        { onSuccess: () => refetch() }
      );
    }
  }; */

   const restoreHidden = (userWidgetId: number) => {
   updateWidget(
     { id: userWidgetId, enabled: true },
     { onSuccess: () => refetch() }
   );
 };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div
          className="grid gap-4 w-full"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {order.map((id) => {
  const uw = enabled.find((w) => w.id === id);
  if (!uw) return null;
 const Widget = map[(uw.type ?? "").toLowerCase() as keyof typeof map];

  //const Widget = map[uw.type as keyof typeof map];
  const isCollapsed = collapsed[uw.id];

            return (
              <Card key={uw.id} id={uw.id}>
              <div className="relative rounded-2xl shadow-md p-4 backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/40 text-sm text-black">
              <button
                    onClick={() => toggleCollapse(uw.id)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                    title="Toggle collapse"
                  >
                    {isCollapsed ? <EyeOff size={18} /> : <Eye size={18} />}
             </button>

                  <h2 className="text-lg font-semibold mb-2 capitalize">
                    {uw.type}
                  </h2>

                  {!isCollapsed && <Widget />}
                </div>
              </Card>
            );
          })}
        </div>
      </SortableContext>
      {disabled.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Hidden Widgets</h3>
          {disabled.map((uw) => (
            <div key={uw.id} className="flex justify-between items-center bg-white/20 p-3 rounded-xl text-sm backdrop-blur-md">
              <span className="capitalize">{uw.type}</span>
              <button
                onClick={() => restoreHidden(uw.id)}
                className="px-2 py-0.5 text-xs rounded bg-green-600 text-white"
              >
                Show
              </button>
            </div>
          ))}
        </div>
      )}
    </DndContext>
  );
}
