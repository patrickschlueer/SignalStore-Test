import { computed, Signal } from '@angular/core';
import { User } from '../../../models/user.interface';

export function userComputedFactory(user: Signal<User | null>) {
  return {
    fullName: computed(() => {
      const currentUser = user();
      if (!currentUser) return '';
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }),
  };
}
