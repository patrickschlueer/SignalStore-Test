import { Injectable } from '@angular/core';
import { Employee } from '../../../models/entities/employee.interface';
import { BaseCollection } from '../base/base.collection';

/**
 * SignalDB Collection for Employee
 * Provides persistent storage in IndexedDB with automatic synchronization
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeCollection extends BaseCollection<Employee> {
  
  constructor() {
    super('employees');
  }
}
