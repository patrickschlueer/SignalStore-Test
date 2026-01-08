export interface News {
  id: string;
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

export interface NewsDto {
  id?: string;
  title: string;
  content: string;
  publishedDate: Date;
  isPublished: boolean;
}
