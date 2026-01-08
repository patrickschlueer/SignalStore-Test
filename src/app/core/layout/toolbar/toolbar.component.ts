import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { injectDispatch } from '@ngrx/signals/events';
import { UserStore } from '../../../shared/stores/user/user.store';
import { userEvents } from '../../../shared/stores/user/events/user-events';
import { layoutEvents } from '../../../shared/stores/layout/events/layout.events';
import { LayoutStore } from '../../../shared/stores/layout/layout.store';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatTooltipModule,
    AvatarComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  protected readonly userStore = inject(UserStore);
  protected readonly layoutStore = inject(LayoutStore);
  protected readonly layoutDispatcher = injectDispatch(layoutEvents);
  private readonly userDispatcher = injectDispatch(userEvents);

  ngOnInit(): void {
    this.userDispatcher.load();
  }
}
