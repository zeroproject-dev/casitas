import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { PrismaHouseRepository } from '@domain/repositories/house.repository';

@Module({
	controllers: [HouseController],
	providers: [
		HouseService,
		{
			provide: 'IHouseRepository',
			useClass: PrismaHouseRepository,
		},
	],
})
export class HouseModule {}
