export interface Exercise {
  id: number;
  name: string;
  duration: number;
  calory: number;
  date?: Date;
  state?: string;
}