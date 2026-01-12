import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

type FilterType = 'all' | 'experts' | 'frontend' | 'backend' | 'fullstack';

@Component({
  selector: 'app-skills-filter',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  templateUrl: './skills-filter.component.html',
  styleUrl: './skills-filter.component.scss'
})
export class SkillsFilterComponent {
  searchQuery = '';
  selectedFilter = signal<FilterType>('all');

  onSearchChange(query: string): void {
    // TODO: Emit search event to parent
    console.log('Search:', query);
  }

  setFilter(filter: FilterType): void {
    this.selectedFilter.set(filter);
    // TODO: Emit filter event to parent
    console.log('Filter:', filter);
  }
}
