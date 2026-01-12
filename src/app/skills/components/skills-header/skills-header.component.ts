import { Component, input, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../../shared/models/entities/employee.interface';

@Component({
  selector: 'app-skills-header',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './skills-header.component.html',
  styleUrl: './skills-header.component.scss'
})
export class SkillsHeaderComponent {
  employees = input.required<Employee[]>();

  // Statistiken
  protected readonly stats = computed(() => {
    const emps = this.employees();
    
    // Unique Skills (aus allen Employees)
    const allSkills = emps.flatMap(e => e.skills || []);
    const uniqueSkillNames = new Set(allSkills.map(s => s.skillName));
    
    // Durchschnittliche Skills pro Employee
    const avgSkillsPerEmployee = emps.length > 0 
      ? (emps.reduce((sum, e) => sum + (e.totalSkillCount || 0), 0) / emps.length).toFixed(1)
      : '0';
    
    // Expert Level Skills (Gesamtanzahl aller Skills mit Level >= 4)
    const expertSkillCount = allSkills.filter(s => s.level >= 4).length;

    return {
      totalEmployees: emps.length,
      uniqueSkills: uniqueSkillNames.size,
      avgSkillsPerEmployee,
      expertSkillCount
    };
  });
}
