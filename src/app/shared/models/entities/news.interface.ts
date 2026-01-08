import { BaseEntity } from '../base/base-entity.interface';

export interface News extends BaseEntity {
  title: string;
  content: string;
  publishedDate: Date;
  isPublished: boolean;
  createdAt: Date;
  createdBy?: string;
  updatedAt: Date;
  updatedBy?: string;
  version: number;
  isDeleted: boolean;
  createdByUsername?: string;
  updatedByUsername?: string;
}
