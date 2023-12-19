import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { PrismaHouseRepository } from '@domain/repositories/house.repository';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
	controllers: [HouseController],
	providers: [
		HouseService,
		{
			provide: 'IHouseRepository',
			useClass: PrismaHouseRepository,
		},
		LocalStrategy,
		JwtStrategy,
	],
	exports: [
		HouseService,
		{
			provide: 'IHouseRepository',
			useClass: PrismaHouseRepository,
		},
	],
	imports: [AuthModule],
})
export class HouseModule {}
