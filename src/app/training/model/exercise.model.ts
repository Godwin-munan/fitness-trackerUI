import { User } from "@core/authentication/model/user.model";

export interface Exercise {
  id: number;
  name: string;
  duration: number;
  calory: number;
  date?: Date;
  state?: string;
}