import { IsDeletedEnum, MenuTypeEnum } from '@/common/enums';
import { CreateMenuDto } from '@/menu/dto/create-menu.dto';
import { QueryMenuDto } from '@/menu/dto/query-menu.dto';
import { UpdateMenuDto } from '@/menu/dto/update-menu.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  validateMenu(menu: UpdateMenuDto) {
    // 非按钮类型 menuUrl必填
    if (menu.menuType !== MenuTypeEnum.BUTTON && !menu.menuUrl) {
      throw new BadRequestException('参数错误');
    }
    // 按钮类型必须有parentId
    if (menu.menuType === MenuTypeEnum.BUTTON && !menu.parentId) {
      throw new BadRequestException('参数错误');
    }
  }

  /**
   * 创建菜单
   * @param createMenuDto
   */
  async createMenu(createMenuDto: CreateMenuDto) {
    this.validateMenu(createMenuDto);
    return this.prismaService.menu.create({ data: createMenuDto });
  }

  /**
   * 修改菜单
   * @param id
   * @param updateMenuDto
   */
  async updateMenu(id: number, updateMenuDto: UpdateMenuDto) {
    this.validateMenu(updateMenuDto);
    const menu: Prisma.MenuUncheckedUpdateInput = { ...updateMenuDto };
    if (menu.menuType === MenuTypeEnum.BUTTON && !menu.parentId) {
      throw new BadRequestException('参数错误');
    }
    // 按钮类型 没有menuUrl
    if (menu.menuType === MenuTypeEnum.BUTTON) {
      menu.menuUrl = null;
    }
    return this.prismaService.menu.update({
      where: { id, isDeleted: IsDeletedEnum.No },
      data: menu,
    });
  }

  /**
   * 删除菜单
   * @param id
   */
  async deleteMenu(id: number) {
    return this.prismaService.menu.update({
      where: { id, isDeleted: IsDeletedEnum.No },
      data: { isDeleted: IsDeletedEnum.Yes },
    });
  }

  /**
   * 查询菜单列表
   * @param queryMenuDto
   */
  async findAllMenuList(queryMenuDto: QueryMenuDto) {
    const { status } = queryMenuDto;
    const where: Prisma.MenuWhereInput = {
      isDeleted: IsDeletedEnum.No,
    };
    const orderBy: Prisma.MenuOrderByWithRelationInput[] = [
      { orderNum: 'asc' },
    ];
    let include: Prisma.MenuInclude;
    if (status) {
      where.status = status;
    } else {
      where.parent = {
        is: null,
      };
      include = {
        children: {
          include: {
            children: {
              orderBy,
            },
          },
          orderBy,
        },
      };
    }
    return this.prismaService.menu.findMany({
      where,
      include,
      orderBy,
    });
  }
}
