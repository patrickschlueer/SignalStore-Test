import { BaseEntity } from "../base/base-entity.interface";

export interface Employee extends BaseEntity {
  firstName: string;
  userName: string;
  lastName: string;
  email?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  mobileNumber?: string;
}
