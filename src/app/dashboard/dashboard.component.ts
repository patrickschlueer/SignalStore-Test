import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NewsCardComponent } from "./components/news-card/news-card.component";
import { EventsCardComponent } from "./components/events-card/events-card.component";
import { TimeAccountCardComponent } from './components/time-account-card/time-account-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatProgressBarModule,
    NewsCardComponent,
    EventsCardComponent,
    TimeAccountCardComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
