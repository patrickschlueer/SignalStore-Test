import { computed, inject } from '@angular/core';
import { EmployeeCollection } from '../../../signaldb/collections/entities/employee.collection';

export function createEmployeeComputedFactory(store: any) {
  const employeeCollection = inject(EmployeeCollection);
  
  return {
    // Reactive: Liest direkt aus Collection
    employees: computed(() => employeeCollection.collection.find().fetch()),
    
    // Gefilterte Employees basierend auf searchQuery und skillFilter
    filteredEmployees: computed(() => {
      const allEmployees = employeeCollection.collection.find().fetch();
      const query = store.searchQuery().toLowerCase();
      const filter = store.skillFilter().filterType.toLowerCase();
      
      return allEmployees.filter(e => {
        // 1. Suchfilter: Name oder Skill
        const matchesSearch = !query || 
          e.userName.toLowerCase().includes(query) ||
          e.firstName.toLowerCase().includes(query) ||
          e.lastName.toLowerCase().includes(query) ||
          e.skills?.some(s => s.skillName.toLowerCase().includes(query));
        
        // 2. Skill-Filter
        let matchesFilter = true;
        
        if (filter === 'experts') {
          // Experten: >= 4 Expert-Level Skills
          matchesFilter = (e.expertSkillCount || 0) >= 4;
        } else if (filter === 'frontend') {
          // Hat Frontend Skills
          matchesFilter = e.skills?.some(s => s.categoryName.toLowerCase() === 'frontend') || false;
        } else if (filter === 'backend') {
          // Hat Backend Skills
          matchesFilter = e.skills?.some(s => s.categoryName.toLowerCase() === 'backend') || false;
        } else if (filter === 'fullstack') {
          // Hat sowohl Frontend als auch Backend Skills
          const hasFrontend = e.skills?.some(s => s.categoryName.toLowerCase() === 'frontend');
          const hasBackend = e.skills?.some(s => s.categoryName.toLowerCase() === 'backend');
          matchesFilter = (hasFrontend && hasBackend) || false;
        }
        // 'all' filter: alle anzeigen
        
        return matchesSearch && matchesFilter;
      });
    }),
    
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
