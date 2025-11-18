import { Task } from "./Task";

export interface Summary {
  municipality: string;
  mayor: string | null;
  tasks: Task[];
}