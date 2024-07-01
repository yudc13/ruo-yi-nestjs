import { CreateMenuDto } from '@/menu/dto/create-menu.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
