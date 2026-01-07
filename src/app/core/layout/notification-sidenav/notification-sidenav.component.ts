import { Component, output, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { NotificationStore } from '../../../shared/stores/notification/notification.store';
import { injectDispatch } from '@ngrx/signals/events';
import { notificationEvents } from '../../../shared/stores/notification/events/notification-events';
import { layoutEvents } from '../../stores/layout/events/layout-events';

@Component({
  selector: 'app-notification-sidenav-content',
  imports: [MatListModule, MatButtonModule, MatIconModule, AvatarComponent],
  templateUrl: './notification-sidenav.component.html',
  styleUrl: './notification-sidenav.component.css'
})
export class NotificationSidenavContentComponent {
  readonly notificationDispatcher = injectDispatch(notificationEvents);
  readonly layoutDispatcher = injectDispatch(layoutEvents);
  protected readonly notificationStore = inject(NotificationStore);

  getRelativeTime(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(timestamp).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'gerade eben';
    if (diffMins < 60) return `vor ${diffMins} Minute${diffMins > 1 ? 'n' : ''}`;
    if (diffHours < 24) return `vor ${diffHours} Stunde${diffHours > 1 ? 'n' : ''}`;
    return `vor ${diffDays} Tag${diffDays > 1 ? 'en' : ''}`;
  }

  getFullName(notification: any): string {
    return `${notification.from.firstName} ${notification.from.lastName}`;
  }
}
