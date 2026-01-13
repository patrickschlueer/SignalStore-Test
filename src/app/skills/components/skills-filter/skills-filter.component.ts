import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { EmployeeStore } from '../../../shared/stores/employee/employee.store';
import { SkillFilter } from '../../../shared/models/helper/skill-filter.interface';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-skills-filter',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIcon
],
  templateUrl: './skills-filter.component.html',
  styleUrl: './skills-filter.component.scss'
})
export class SkillsFilterComponent {
  private readonly employeeStore = inject(EmployeeStore);

  searchQuery = this.employeeStore.searchQuery;
  selectedFilter = this.employeeStore.skillFilter;
  skillFilters = this.employeeStore.skillFilters;


  onSearchChange(query: string): void {
    this.employeeStore.setSearchQuery(query);
  }

  setFilter(filter: SkillFilter): void {
    this.employeeStore.setSkillFilter(filter);
  }
}
