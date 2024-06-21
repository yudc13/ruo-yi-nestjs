import { CreateDeptDto } from '@/department/dto/create-dept.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDeptDto extends PartialType(CreateDeptDto) {}
