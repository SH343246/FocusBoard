import CryptoWidget from "./Cryptowidget";
import WeatherWidget from "./Weatherwidgets";
import NasaWidget from "./Nasapicwidget";
import NewsWidget from "./Newswidget";
import TimezoneWidget from "./Timezonewidget";
import QuoteWidget from "./Quotewidgets";
import JokeWidget from "./Jokewidget";

export type WidgetProps = {
  compact?: boolean;
} & Record<string, unknown>;

const registry = {
  Crypto: CryptoWidget,
  Weather: WeatherWidget,
  Nasa: NasaWidget,
  News: NewsWidget,
  Timezone: TimezoneWidget,
  Quote: QuoteWidget,
  Joke: JokeWidget,
  Clock: TimezoneWidget,
} as const;

export const WidgetRegistry = //Need a prop 
  registry as unknown as Record<string, React.ComponentType<WidgetProps>>;
