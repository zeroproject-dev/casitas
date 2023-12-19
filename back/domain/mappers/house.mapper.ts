import { House } from '@prisma/client';
import { HouseEntity, UserEntity } from 'domain/entities';

export class HouseMapper {
	static fromPrisma(prismaHouse: House): HouseEntity {
		const { cost, ...rest } = prismaHouse;

		return {
			cost: Number(cost),
			pos: { lat: 0, lng: 0 },
			User: null,
			...rest,
		};
	}

	static fromPrismaQuery(prismaHouse: any): HouseEntity {
		const { x, y, ...rest } = prismaHouse;
		const {
			houseId,
			houseName,
			houseCost,
			houseDescription,
			isfavorite,
			houseCreatedAt,
			houseUpdatedAt,
			...rest2
		} = rest;
		const {
			userEmail,
			userName,
			userLastname,
			username,
			userId,
			userUpdatedAt,
			userCreatedAt,
		} = rest2;
		return {
			pos: { lat: x, lng: y },
			User: new UserEntity({
				email: userEmail,
				name: userName,
				lastname: userLastname,
				username,
				id: userId,
				password: '',
				updatedAt: userUpdatedAt,
				createdAt: userCreatedAt,
			}),
			id: houseId,
			name: houseName,
			cost: houseCost,
			isFavorite: isfavorite,
			description: houseDescription,
			createdAt: houseCreatedAt,
			updatedAt: houseUpdatedAt,
		};
	}
}
