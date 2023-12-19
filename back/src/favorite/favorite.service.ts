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

	async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
		return this.prisma.favorite.findMany({
			where: { userId },
		});
	}

	async removeFavorite(userId: number, houseId: number): Promise<void> {
		await this.prisma.favorite.delete({
			where: {
				id: { userId: userId, houseId: houseId },
			},
		});
	}
}
