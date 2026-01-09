import { computed, inject } from '@angular/core';
import { BirthdayCollection } from '../../../signaldb/collections/entities/birthday.collection';

export function createBirthdayComputedFactory() {
  const birthdayCollection = inject(BirthdayCollection);
  
  return {
    // Reactive: Liest direkt aus Collection
    birthdays: computed(() => birthdayCollection.collection.find().fetch()),
    
    // Nächste 5 Geburtstage ab heute
    sortedBirthdays: computed(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Nur Datum, keine Zeit
      
      const allBirthdays = birthdayCollection.collection.find().fetch();
      
      return [...allBirthdays]
        .filter(b => new Date(b.birthday).getTime() >= today.getTime()) // Nur zukünftige
        .sort((a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime()) // Sortieren
        .slice(0, 5); // Nur die ersten 5
    }),
    
    // Anzahl der Geburtstage
    totalCount: computed(() => {
      return birthdayCollection.collection.find().fetch().length;
    })
  };
}
