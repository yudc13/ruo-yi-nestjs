import { CreateUserDto } from '@/user/dto/create-user.dto';
import { QueryUserDto } from '@/user/dto/query-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { UserEntity } from '@/user/entity/user.entity';
import { UserService } from '@/user/user.service';
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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return new UserEntity(user);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.deleteUser(id);
    return null;
  }
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, updateUserDto);
    return new UserEntity(user);
  }
  @Get()
  async getUserPage(@Query() queryUserDto: QueryUserDto) {
    const { total, list } = await this.userService.findUserByPage(queryUserDto);
    return {
      total,
      list: list.map((user) => new UserEntity(user)),
    };
  }
}
