import { Injectable, inject } from "@angular/core";
import { Employee } from "../../../models/entities/employee.interface";
import { EmployeeCollection } from "../../collections/entities/employee.collection";
import { BaseSyncManager } from "../base/base-sync-manager";
import { EmployeeApiService } from "../../../services/employee-api.service";

/**
 * Employee Sync Manager
 * Handles synchronization for Employee entities
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeSyncManager extends BaseSyncManager<Employee> {
  
  constructor() {
    const employeeCollection = inject(EmployeeCollection);
    const employeeApiService = inject(EmployeeApiService);
    super('employees', employeeCollection, employeeApiService);
  }

  protected getLoadMethod(): string {
    return 'getEmployees';
  }

  protected getDeltaMethod(): string {
    return 'getDelta';
  }
}
