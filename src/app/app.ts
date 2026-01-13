import { Component, inject } from '@angular/core';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [SidenavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly iconRegistry = inject(MatIconRegistry);
  
  constructor() {
    this.iconRegistry.registerFontClassAlias('symbols', 'material-symbols-outlined');
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
