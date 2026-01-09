import { Employee } from './employee.interface';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  from: Employee;
}
