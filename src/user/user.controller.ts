import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserEntity } from '@/user/entity/user.entity';
import { UserService } from '@/user/user.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto)
    return new UserEntity(user)
  }
}
