import { Component, inject, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NewsStore } from '../../../shared/stores/news/news.store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-card',
  imports: [
    MatCardModule,
    DatePipe
  ],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {

  private readonly newsStore = inject(NewsStore);
  
  readonly news = this.newsStore.sortedNews;
  readonly isLoading = this.newsStore.isLoading;

  constructor() {
    this.newsStore.loadNews();
  }

}
