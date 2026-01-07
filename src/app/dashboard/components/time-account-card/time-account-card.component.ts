import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-time-account-card',
  imports: [
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './time-account-card.component.html',
  styleUrl: './time-account-card.component.scss'
})
export class TimeAccountCardComponent {}
