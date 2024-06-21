import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class PageDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  @Type(() => Number)
  pageSize: number;
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  @Type(() => Number)
  current: number;
}
