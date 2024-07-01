import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaConfigService } from './prisma/prisma-config.service';
import { DepartmentModule } from './department/department.module';
import { UserModule } from './user/user.module';
import { MenuService } from './menu/menu.service';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    PrismaModule,
    DepartmentModule,
    UserModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    MenuService,
  ],
})
export class AppModule {}
