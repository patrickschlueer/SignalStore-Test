import { BaseEntity } from "../base/base-entity.interface";

export interface EmployeeSkill extends BaseEntity {
    skillName: string;
    categoryName: string;
    categoryIcon: string;
    categoryColor: string;
    level: number;
    yearsOfExperience: number;
    isPrimary: boolean;
}
