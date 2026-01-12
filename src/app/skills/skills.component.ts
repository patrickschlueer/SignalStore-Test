import { Component, inject } from '@angular/core';
import { EmployeeStore } from '../shared/stores/employee/employee.store';
import { SkillsHeaderComponent } from './components/skills-header/skills-header.component';
import { SkillsFilterComponent } from './components/skills-filter/skills-filter.component';
import { SkillsCardComponent } from './components/skills-card/skills-card.component';

@Component({
  selector: 'app-skills',
  imports: [
    SkillsHeaderComponent,
    SkillsFilterComponent,
    SkillsCardComponent
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  protected readonly employeeStore = inject(EmployeeStore);

  // Employees aus Store
  protected readonly employees = this.employeeStore.sortedEmployees;
}
