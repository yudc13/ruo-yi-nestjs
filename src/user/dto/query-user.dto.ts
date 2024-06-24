import { PageDto } from '@/common/page.dto';
import { IsOptional, IsString } from 'class-validator';

export class QueryUserDto extends PageDto {
  @IsString()
  @IsOptional()
  userName: string;
}
