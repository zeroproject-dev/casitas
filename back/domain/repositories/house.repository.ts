import { HouseCreateDTO, HouseUpdateDTO } from 'domain/dto/house.dto';
import { PrismaClient } from '@prisma/client';
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

	create(data: HouseCreateDTO): Promise<HouseEntity>;
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

	async getAll(
		filters: HouseFilters,
		paginator: Paginator,
	): Promise<HouseEntity[]> {
		let res;
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

	async insertGeoJson(data: HouseCreateDTO) {
		await this.prisma
			.$queryRaw`INSERT INTO house (name, cost, description, pos) VALUES (${
			data.name
		}, ${data.cost}, ${data.description}, ${JSON.stringify(data.pos)})`;
	}

	async create(data: HouseCreateDTO): Promise<HouseEntity> {
		await this.insertGeoJson(data);
		const newHouse = await this.prisma.house.findFirst({
			where: {
				AND: [
					{ name: data.name },
					{ cost: data.cost },
					{ description: data.description },
				],
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
