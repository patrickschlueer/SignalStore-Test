import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationComponent } from '../../../shared/notification/notification.component';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { injectDispatch } from '@ngrx/signals/events';
import { layoutEvents } from '../../stores/layout/events/layout-events';
import { UserStore } from '../../../shared/stores/user/user.store';
import { userEvents } from '../../../shared/stores/user/events/user-events';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    NotificationComponent, 
    AvatarComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  protected readonly userStore = inject(UserStore);
  protected readonly layoutDispatcher = injectDispatch(layoutEvents);
  private readonly userDispatcher = injectDispatch(userEvents);

  ngOnInit(): void {
    this.userDispatcher.load();
  }
}
