import { CreateDeptDto } from '@/department/dto/create-dept.dto';
import { QueryDeptDto } from '@/department/dto/query-dept.dto';
import { UpdateDeptDto } from '@/department/dto/update-dept.dto';
import {
  Body,
  Controller,
  Delete, Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, Query,
} from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createDeptDto: CreateDeptDto) {
    console.log(createDeptDto);
    return this.departmentService.createDept(createDeptDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.departmentService.deleteDeptById(id);
  }
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDeptDto: UpdateDeptDto) {
    return this.departmentService.updateDeptById(id, updateDeptDto);
  }
  @Get()
  async findAll(@Query() queryDeptDto: QueryDeptDto) {
    return this.departmentService.findDepartmentByPage(queryDeptDto);
  }
}
