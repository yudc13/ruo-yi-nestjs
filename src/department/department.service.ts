import { IsDeletedEnum } from '@/common/enums';
import { PageEntity } from '@/common/page.entity';
import { CreateDeptDto } from '@/department/dto/create-dept.dto';
import { QueryDeptDto } from '@/department/dto/query-dept.dto';
import { UpdateDeptDto } from '@/department/dto/update-dept.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 创建部门
   * @param createDeptDto
   */
  async createDept(createDeptDto: CreateDeptDto) {
    return this.prismaService.department.create({ data: createDeptDto });
  }

  /**
   * 删除部门
   * @param id 部门id
   */
  async deleteDeptById(id: number) {
    await this.prismaService.department.update({
      where: { id, isDeleted: IsDeletedEnum.No },
      data: { isDeleted: IsDeletedEnum.Yes },
    });
    return null;
  }

  /**
   * 修改部门信息
   * @param id 部门id
   * @param updateDeptDto
   */
  async updateDeptById(id: number, updateDeptDto: UpdateDeptDto) {
    return this.prismaService.department.update({
      where: { id, isDeleted: IsDeletedEnum.No },
      data: updateDeptDto,
    });
  }
  async findDepartmentByPage(queryDeptDto: QueryDeptDto) {
    const { pageSize, current, ...query } = queryDeptDto;
    const pageEntity = new PageEntity({ pageSize, current });
    const where: Prisma.DepartmentWhereInput = {
      isDeleted: IsDeletedEnum.No,
    };
    if (query.departmentName) {
      where.departmentName = {
        contains: query.departmentName,
      };
    }
    if (query.status) {
      where.status = {
        equals: query.status,
      };
    }
    const count = await this.prismaService.department.count({
      where,
    });
    if (count === 0) {
      return {
        total: 0,
        list: [],
      };
    }
    const departmentList = await this.prismaService.department.findMany({
      where,
      orderBy: [{ orderNum: 'asc' }],
      skip: pageEntity.skip,
      take: pageEntity.take,
    });
    return {
      total: count,
      list: departmentList,
    };
  }
}
