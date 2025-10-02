// src/features/widget/WidgetRegistry.ts
import CryptoWidget from "./Cryptowidget";
import WeatherWidget from "./Weatherwidgets";
import NasaWidget from "./Nasapicwidget";
import NewsWidget from "./Newswidget";
import TimezoneWidget from "./Timezonewidget";
import QuoteWidget from "./Quotewidgets";
import JokeWidget from "./Jokewidget";

export type WidgetProps = { compact?: boolean };

export const WidgetRegistry: Record<string, React.ComponentType<WidgetProps>> = {
  Crypto: CryptoWidget,
  Weather: WeatherWidget,
  Nasa: NasaWidget,
  News: NewsWidget,
  Timezone: TimezoneWidget,
  Quote: QuoteWidget,
  Joke: JokeWidget,
  Clock: TimezoneWidget,
};

// Optional: case-insensitive lookup helper
export const WidgetRegistryLC: Record<string, React.ComponentType<WidgetProps>> =
  Object.fromEntries(Object.entries(WidgetRegistry).map(([k, v]) => [k.toLowerCase(), v]));
