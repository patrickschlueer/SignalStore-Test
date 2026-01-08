import { computed, Signal } from '@angular/core';
import { Birthday } from '../../../models/entities/birthday.interface';

export function birthdayComputedFactory(birthdayEntities: Signal<Birthday[]>) {
  return {
    sortedBirthdays: computed(() => {
      return [...birthdayEntities()].sort((a, b) => 
        new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
      );
    })
  };
}
