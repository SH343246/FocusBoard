export interface Habit {
  id: number;
  name: string;
  frequency: string;
  description?: string;
  start_date?: string;
  completed? : boolean;
}
