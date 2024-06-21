import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
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
}
