import { computed, inject } from '@angular/core';
import { EmployeeCollection } from '../../../signaldb/collections/entities/employee.collection';

export function createEmployeeComputedFactory() {
  const employeeCollection = inject(EmployeeCollection);
  
  return {
    // Reactive: Liest direkt aus Collection
    employees: computed(() => employeeCollection.collection.find().fetch()),
    
    // Sortierte Employees nach Nachname, dann Vorname
    sortedEmployees: computed(() => {
      const allEmployees = employeeCollection.collection.find().fetch();
      return [...allEmployees].sort((a, b) => {
        const lastNameCompare = a.lastName.localeCompare(b.lastName);
        if (lastNameCompare !== 0) return lastNameCompare;
        return a.firstName.localeCompare(b.firstName);
      });
    }),
    
    // Anzahl der Employees
    totalCount: computed(() => {
      return employeeCollection.collection.find().fetch().length;
    })
  };
}
