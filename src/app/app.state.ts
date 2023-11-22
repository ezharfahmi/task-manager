import { Task } from './Store/Model/Task.model';

export interface AppState {
  tasks: Task[];
  // Add other slices of state as needed
}