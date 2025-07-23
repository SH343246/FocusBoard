export interface Habit {
  id: number;
  name: string;
  frequency: string;
  description?: string;
  start_date?: string;
  completed? : boolean;


}

export interface Todos {
  id: number;
  title: string;
  description?: string;
  done: boolean;
}
