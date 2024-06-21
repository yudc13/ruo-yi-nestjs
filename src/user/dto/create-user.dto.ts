import { GenderEnum, StatusEnum } from '@/common/enums';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsString()
  @IsNotEmpty()
  account: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(GenderEnum)
  gender: string;
  @IsMobilePhone()
  phone: string
  @IsEmail()
  email: string;
  @IsEnum(StatusEnum)
  status: string;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  departmentId: number
}