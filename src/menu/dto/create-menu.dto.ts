import { MenuTypeEnum, StatusEnum } from '@/common/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  menuName: string;
  @IsEnum(MenuTypeEnum)
  menuType: string;
  @IsString()
  @IsOptional()
  menuUrl: string;
  @IsString()
  @IsOptional()
  menuIcon: string;
  @IsNumber()
  orderNum: number;
  @IsString()
  permsCode: string;
  @IsEnum(StatusEnum)
  status: string;
  @IsNumber()
  @IsOptional()
  parentId: number;
}
