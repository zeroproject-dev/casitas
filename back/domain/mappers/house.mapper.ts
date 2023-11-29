import { House } from '@prisma/client';
import { HouseEntity } from 'domain/entities';

export class HouseMapper {
	static fromPrisma(prismaHouse: House): HouseEntity {
		const { cost, ...rest } = prismaHouse;

		return {
			cost: Number(cost),
			pos: { lat: 0, lng: 0 },
			...rest,
		};
	}
}
