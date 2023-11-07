import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HouseModule } from './house/house.module';

@Module({
	controllers: [AppController],
	providers: [AppService, PrismaService],
	imports: [UserModule, AuthModule, HouseModule],
})
export class AppModule {}
