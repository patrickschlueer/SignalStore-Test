import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { injectDispatch } from '@ngrx/signals/events';
import { notificationEvents } from '../../stores/notification/events/notification-events';
import { NotificationStore } from '../../stores/notification/notification.store';

@Component({
  selector: 'app-notification',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  protected readonly notificationDispatcher = injectDispatch(notificationEvents);
  protected readonly notificationStore = inject(NotificationStore);

  unreadCount = this.notificationStore.unreadCount;
  hasUnread = this.notificationStore.hasUnread;
  
  ngOnInit(): void {
    this.notificationDispatcher.load();
  }
}
