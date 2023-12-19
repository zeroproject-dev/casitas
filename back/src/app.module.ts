import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HouseModule } from './house/house.module';
import { FavoriteService } from './favorite/favorite.service';
import { FavoriteController } from './favorite/favorite.controller';
import { HouseService } from './house/house.service';

@Module({
	controllers: [AppController, FavoriteController],
	providers: [AppService, PrismaService, FavoriteService, HouseService],
	imports: [UserModule, AuthModule, HouseModule],
})
export class AppModule {}
