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
    }),

    // Nächste 5 Geburtstage ab heute
    upcomingBirthdays: computed(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Nur Datum, keine Zeit

      const allEmployees = employeeCollection.collection.find().fetch();

      // Employees mit Geburtstag filtern und sortieren
      return allEmployees
        .filter(e => e.birthday) // Nur Employees mit Birthday
        .filter(e => new Date(e.birthday!).getTime() >= today.getTime()) // Nur zukünftige
        .sort((a, b) => new Date(a.birthday!).getTime() - new Date(b.birthday!).getTime()) // Nach Datum sortieren
        .slice(0, 5); // Nur die ersten 5
    })
  };
}
