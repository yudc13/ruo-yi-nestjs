import { IsEmail, IsEnum, IsInt, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from '@/common/enums';

export class CreateDeptDto {
  @IsNotEmpty()
  @IsString()
  departmentName: string;
  @IsNotEmpty()
  @IsInt()
  orderNum: number;
  @IsEnum(StatusEnum)
  status: string;
  @IsString()
  @IsOptional()
  leader: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsMobilePhone()
  @IsOptional()
  phone: string;
  @IsInt()
  @IsOptional()
  parentId: number;
}
