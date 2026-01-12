import { Component, input, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { AvatarModule } from 'ngx-avatars';
import { Employee } from '../../../shared/models/entities/employee.interface';

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatChipsModule,
    MatDividerModule,
    AvatarModule
  ],
  templateUrl: './skills-card.component.html',
  styleUrl: './skills-card.component.scss'
})
export class SkillsCardComponent {
  employee = input.required<Employee>();
  showAllSkills = false;
  
  // Nur die ersten 6-7 Skills anzeigen, Rest hinter "+X mehr"
  private readonly maxVisibleSkills = 7;

  protected readonly visibleSkills = computed(() => {
    const skills = this.employee().skills || [];
    return this.showAllSkills ? skills : skills.slice(0, this.maxVisibleSkills);
  });

  protected readonly remainingSkillsCount = computed(() => {
    const totalSkills = (this.employee().skills || []).length;
    return Math.max(0, totalSkills - this.maxVisibleSkills);
  });

  // Level-Dots generieren (5 Dots total, gefüllt bis Level)
  protected getLevelDots(level: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < level);
  }
}
