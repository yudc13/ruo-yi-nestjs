import { Exclude } from 'class-transformer';

export class UserEntity {
  userName: string;
  account: string;
  @Exclude()
  password: string;
  gender: string;
  phone: string
  email: string;
  status: string;
  departmentId: number
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}