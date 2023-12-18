import { HouseCreateDTO, HouseUpdateDTO } from 'domain/dto/house.dto';
import { House, PrismaClient } from '@prisma/client';
import { HouseMapper } from 'domain/mappers/house.mapper';
import { HouseEntity } from 'domain/entities';
import { Paginator } from 'commons/paginator';

export interface HouseFilters {
	maxCost: number;
	minCost: number;
}

export interface IHouseRepository {
	getById(id: number): Promise<HouseEntity>;
	getAll(filters: HouseFilters, paginator: Paginator): Promise<HouseEntity[]>;

	create(userId: number, data: HouseCreateDTO): Promise<HouseEntity>;
	update(data: HouseUpdateDTO): Promise<HouseEntity>;

	delete(id: number): Promise<HouseEntity>;
}

export class PrismaHouseRepository implements IHouseRepository {
	prisma = new PrismaClient();

	async getById(id: number): Promise<HouseEntity> {
		const res = await this.prisma.house.findUnique({
			where: {
				id: id,
			},
		});

		const entity = HouseMapper.fromPrisma(res);
		return entity;
	}

	async getHouses() {
		const q = `SELECT h.id as "houseId", h."name" as "houseName", h."cost" as "houseCost", h.description as "houseDescription", h."createdAt" as "houseCreatedAt", h."updatedAt" as "houseUpdatedAt", ST_X(h.pos) AS x, ST_Y(h.pos) AS y, u.email as "userEmail", u.name as "userName", u.lastname as "userLastname", u.id as "userId", u.username as username, u."createdAt" as "userCreatedAt", u."updatedAt" as "userUpdatedAt" FROM "House" h INNER JOIN "User" u ON h."userId" = u.id;`;
		const res: any = await this.prisma.$queryRawUnsafe(q);
		return res.map(HouseMapper.fromPrismaQuery);
	}

	async getAll(
		filters: HouseFilters,
		paginator: Paginator,
	): Promise<HouseEntity[]> {
		let res: House[];
		return await this.getHouses();

		if (filters !== null) {
			res = await this.prisma.house.findMany({
				take: paginator.limit,
				skip: paginator.offset,
				where: {
					cost: {
						lte: filters.maxCost,
						gt: filters.minCost,
					},
				},
				include: {
					User: true,
				},
			});
		} else {
			res = await this.prisma.house.findMany({
				include: {
					User: true,
				},
			});
		}

		const entities = res.map(HouseMapper.fromPrisma);
		return entities;
	}

	async insertGeoJson(userId: number, data: HouseCreateDTO) {
		const date = new Date();
		const q = `INSERT INTO "House" (name, cost, description, pos, "userId", "createdAt", "updatedAt") VALUES ('${
			data.name
		}', ${Number(data.cost)}, '${data.description}',
ST_MakePoint(${data.pos.lat}, ${
			data.pos.lng
		}), ${userId}, TO_TIMESTAMP('${date.toISOString()}', 'YYYY-MM-DDTHH24:MI:SS.MSZ'), TO_TIMESTAMP('${date.toISOString()}', 'YYYY-MM-DDTHH24:MI:SS.MSZ'))`;
		await this.prisma.$queryRawUnsafe(q);
	}

	async create(userId: number, data: HouseCreateDTO): Promise<HouseEntity> {
		await this.insertGeoJson(userId, data);
		const newHouse = await this.prisma.house.findFirst({
			where: {
				AND: [{ name: data.name }, { description: data.description }],
			},
		});
		return HouseMapper.fromPrisma(newHouse);
	}

	async update(data: HouseUpdateDTO): Promise<HouseEntity> {
		const updatedHouse = await this.prisma.house.update({
			where: { id: data.id },
			data,
		});

		return HouseMapper.fromPrisma(updatedHouse);
	}

	async delete(id: number): Promise<HouseEntity> {
		const deletedHouse = await this.prisma.house.delete({
			where: { id },
		});

		return HouseMapper.fromPrisma(deletedHouse);
	}
}
