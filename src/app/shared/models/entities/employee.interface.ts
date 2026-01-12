import { BaseEntity } from "../base/base-entity.interface";
import { EmployeeSkill } from "./employee-skill.interface";

export interface Employee extends BaseEntity {
  firstName: string;
  userName: string;
  lastName: string;
  email?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  birthday?: Date; // Computed: Geburtstag im aktuellen Jahr (vom Backend berechnet)
  phoneNumber?: string;
  mobileNumber?: string;

  initials?: string;
  skills?: EmployeeSkill[];
  totalSkillCount?: number;
  expertSkillCount?: number;
  
}
