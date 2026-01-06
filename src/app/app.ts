import { Component } from '@angular/core';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [SidenavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
