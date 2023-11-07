import { House } from '@prisma/client';
import { HouseEntity } from 'domain/entities';

export class HouseMapper {
	static fromPrisma(prismaHouse: House): HouseEntity {
		const { cost, ...rest } = prismaHouse;

		return {
			cost: Number(cost),
			...rest,
			pos: {},
		};
	}
}
