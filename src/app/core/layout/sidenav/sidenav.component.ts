import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { NavigationSidenavContentComponent } from '../navigation-sidenav/navigation-sidenav.component';
import { LayoutStore } from '../../stores/layout/layout.store';
import { injectDispatch } from '@ngrx/signals/events';
import { layoutEvents } from '../../stores/layout/events/layout-events';

@Component({
  selector: 'app-sidenav',
  imports: [
    RouterModule,
    MatSidenavModule,
    ToolbarComponent,
    NavigationSidenavContentComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  protected readonly layoutStore = inject(LayoutStore);
  protected readonly layoutDispatcher = injectDispatch(layoutEvents);
}
