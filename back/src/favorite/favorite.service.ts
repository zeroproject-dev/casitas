import { HouseMapper } from '@domain/mappers/house.mapper';
import { Injectable } from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
	constructor(private prisma: PrismaService) {}

	async addFavorite(userId: number, houseId: number): Promise<Favorite> {
		return this.prisma.favorite.create({
			data: { userId, houseId },
		});
	}

	async getHouses(userId: number) {
		const q = `SELECT h.id as "houseId", h."name" as "houseName", h."cost" as "houseCost", h.description as "houseDescription", h."createdAt" as "houseCreatedAt", h."updatedAt" as "houseUpdatedAt", ST_X(h.pos) AS x, ST_Y(h.pos) AS y, u.email as "userEmail", u.name as "userName", u.lastname as "userLastname", u.id as "userId", u.username as username, u."createdAt" as "userCreatedAt", u."updatedAt" as "userUpdatedAt", CASE WHEN f."userId" IS NOT NULL THEN true ELSE false END as isFavorite FROM "House" h LEFT JOIN "Favorite" f ON h.id = f."houseId" AND f."userId" = ${userId} INNER JOIN "User" u ON h."userId" = u.id;`;
		const res: any = await this.prisma.$queryRawUnsafe(q);
		return res.map(HouseMapper.fromPrismaQuery);
	}

	async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
		return this.getHouses(userId);
	}

	async removeFavorite(userId: number, houseId: number): Promise<void> {
		await this.prisma.favorite.delete({
			where: {
				id: { userId: userId, houseId: houseId },
			},
		});
	}
}
