import { MenuService } from '@/menu/menu.service';
import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';

@Module({
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
