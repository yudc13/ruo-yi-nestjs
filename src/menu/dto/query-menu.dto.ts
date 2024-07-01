import { StatusEnum } from '@/common/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class QueryMenuDto {
  @IsEnum(StatusEnum)
  @IsOptional()
  status: string;
}
