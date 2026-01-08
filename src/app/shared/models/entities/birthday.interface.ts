import { BaseEntity } from '../base/base-entity.interface';

export interface Birthday extends BaseEntity {
    userName: string;
    birthday: Date;
}
