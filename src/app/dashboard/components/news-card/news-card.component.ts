import { Component, inject, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NewsStore } from '../../../shared/stores/news/news.store';
import { DatePipe } from '@angular/common';
import { News } from '../../../shared/models/entities/news.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-news-card',
  imports: [
    MatCardModule,
    DatePipe,
    MatIconModule
  ],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  private readonly newsStore = inject(NewsStore);
  readonly news: Signal<News[]> = this.newsStore.sortedNews;

  // Store lädt automatisch via onInit Hook
}
