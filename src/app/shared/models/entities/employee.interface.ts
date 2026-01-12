import { BaseEntity } from "../base/base-entity.interface";

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
}
