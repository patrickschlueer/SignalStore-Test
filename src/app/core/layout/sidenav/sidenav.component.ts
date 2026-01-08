import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { NavigationSidenavContentComponent } from '../navigation-sidenav/navigation-sidenav.component';
import { injectDispatch } from '@ngrx/signals/events';
import { layoutEvents } from '../../../shared/stores/layout/events/layout.events';
import { LayoutStore } from '../../../shared/stores/layout/layout.store';

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
