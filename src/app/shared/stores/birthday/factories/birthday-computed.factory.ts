import { computed, inject } from '@angular/core';
import { BirthdayCollection } from '../../../signaldb/collections/entities/birthday.collection';

export function createBirthdayComputedFactory() {
  const birthdayCollection = inject(BirthdayCollection);
  
  return {
    // Reactive: Liest direkt aus Collection
    birthdays: computed(() => birthdayCollection.collection.find().fetch()),
    
    // Sortierte Geburtstage nach Datum (älteste zuerst)
    sortedBirthdays: computed(() => {
      const allBirthdays = birthdayCollection.collection.find().fetch();
      return [...allBirthdays].sort((a, b) => 
        new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
      );
    }),
    
    // Anzahl der Geburtstage
    totalCount: computed(() => {
      return birthdayCollection.collection.find().fetch().length;
    })
  };
}
