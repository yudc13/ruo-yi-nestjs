import { IsDeletedEnum, StatusEnum } from '@/common/enums';
import { PageEntity } from '@/common/page.entity';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { QueryUserDto } from '@/user/dto/query-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 创建用户
   * @param createUserDto
   */
  async createUser(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  /**
   * 删除用户
   * @param id
   */
  async deleteUser(id: number) {
    return this.prismaService.user.update({
      where: { id, isDeleted: IsDeletedEnum.No },
      data: { isDeleted: IsDeletedEnum.Yes },
    });
  }
  /**
   * 修改用户
   * @param id 用户id
   * @param updateUserDto
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id, isDeleted: IsDeletedEnum.No },
      data: updateUserDto,
    });
  }

  /**
   * 查询用户信息
   * @param queryUserDto
   */
  async findUserByPage(queryUserDto: QueryUserDto) {
    const { pageSize, current, ...query } = queryUserDto;
    const { skip, take } = new PageEntity({ pageSize, current });
    const where: Prisma.UserWhereInput = {
      isDeleted: IsDeletedEnum.No,
      status: StatusEnum.Show,
    };
    if (query.userName) {
      where.userName = {
        contains: query.userName,
      };
    }
    const count = await this.prismaService.user.count({
      where,
    });
    if (count === 0) {
      return {
        total: 0,
        list: [],
      };
    }
    const userList = await this.prismaService.user.findMany({
      where,
      take,
      skip,
      orderBy: [{ createAt: 'asc' }],
    });
    return {
      total: count,
      list: userList,
    };
  }
}
