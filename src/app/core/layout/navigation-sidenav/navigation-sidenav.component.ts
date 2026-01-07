import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NavigationStore } from '../../../shared/stores/navigation/navigation.store';
import { injectDispatch } from '@ngrx/signals/events';
import { navigationEvents } from '../../../shared/stores/navigation/events/navigation-events';

@Component({
  selector: 'app-navigation-sidenav-content',
  imports: [RouterModule, MatListModule, MatIconModule],
  templateUrl: './navigation-sidenav.component.html',
  styleUrl: './navigation-sidenav.component.scss'
})
export class NavigationSidenavContentComponent implements OnInit {
  protected readonly navigationStore = inject(NavigationStore);
  protected readonly navigationDispatcher = injectDispatch(navigationEvents);

  ngOnInit(): void {
    this.navigationDispatcher.load();
  }
}
