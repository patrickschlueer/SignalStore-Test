import { computed, Signal } from '@angular/core';
import { Employee } from '../../../models/entities/employee.interface';

export function userComputedFactory(user: Signal<Employee | null>) {
  return {
    fullName: computed(() => {
      const currentUser = user();
      if (!currentUser) return '';
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }),
  };
}
