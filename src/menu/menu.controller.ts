import { CreateMenuDto } from '@/menu/dto/create-menu.dto';
import { QueryMenuDto } from '@/menu/dto/query-menu.dto';
import { UpdateMenuDto } from '@/menu/dto/update-menu.dto';
import { MenuService } from '@/menu/menu.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(id, updateMenuDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.menuService.deleteMenu(id);
  }
  @Get()
  async getAll(@Query() queryMenuDto: QueryMenuDto) {
    return this.menuService.findAllMenuList(queryMenuDto);
  }
}
