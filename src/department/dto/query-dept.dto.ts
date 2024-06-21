import { StatusEnum } from '@/common/enums';
import { PageDto } from '@/common/page.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryDeptDto extends PageDto {
  @IsString()
  @IsOptional()
  departmentName: string;
  @IsEnum(StatusEnum)
  @IsOptional()
  status: string;
}
