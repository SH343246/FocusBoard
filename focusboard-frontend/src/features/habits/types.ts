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

export interface Widget {
  id: number;
  name: string;
  slug: string;
  description?: string;

}

export interface UserWidget {
  id: number;
  user_id: number;
  widget_id: number;
  enabled: boolean;
  position: number;
  style: string;
  widget: {
    id: number;
    name: string;
    description: string;
  };
}
