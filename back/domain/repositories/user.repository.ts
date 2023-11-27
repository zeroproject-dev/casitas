import { PrismaClient } from '@prisma/client';
import { Paginator } from 'commons/paginator';
import { UserCreateDTO, UserUpdateDTO } from 'domain/dto/user.dto';
import { UserEntity } from 'domain/entities';
import { UserMapper } from 'domain/mappers/user.mapper';

export interface UserFilters {
	includeHouses: boolean;
}

export interface IUserRepository {
	getById(id: number): Promise<UserEntity | null>;
	getByUniqueField(key: string): Promise<UserEntity | null>;
	getAll(filters: UserFilters, paginator: Paginator): Promise<UserEntity[]>;

	create(data: UserCreateDTO): Promise<UserEntity | null>;
	update(data: UserUpdateDTO): Promise<UserEntity | null>;

	delete(id: number): Promise<UserEntity | null>;
}

export class PrismaUserRepository implements IUserRepository {
	prisma = new PrismaClient();

	async getById(id: number): Promise<UserEntity> {
		const res = await this.prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		const entity = UserMapper.fromPrisma(res);
		return entity;
	}

	async getByUniqueField(key: string): Promise<UserEntity | null> {
		const res = await this.prisma.user.findFirst({
			where: {
				OR: [{ email: key }, { username: key }],
			},
		});

		const entity = UserMapper.fromPrisma(res);
		return entity;
	}

	async getAll(
		filters: UserFilters,
		paginator: Paginator,
	): Promise<UserEntity[]> {
		const opts = {};
		if (filters !== null) {
			const { includeHouses, ...rest } = filters;
			opts['where'] = {
				rest,
				include: {
					houses: includeHouses,
				},
			};
		}

		if (paginator !== null) {
			opts['take'] = paginator.limit;
			opts['skip'] = paginator.offset;
		}

		const res = await this.prisma.user.findMany(opts);

		const entities = res.map(UserMapper.fromPrisma);
		return entities;
	}

	async create(data: UserCreateDTO): Promise<UserEntity | null> {
		const newUser = await this.prisma.user.create({ data });
		return UserMapper.fromPrisma(newUser);
	}

	async update(data: UserUpdateDTO): Promise<UserEntity | null> {
		const updatedUser = await this.prisma.user.update({
			where: {
				id: data.id,
			},
			data,
		});

		return UserMapper.fromPrisma(updatedUser);
	}

	async delete(id: number): Promise<UserEntity | null> {
		const deletedUser = await this.prisma.user.delete({
			where: { id },
		});

		return UserMapper.fromPrisma(deletedUser);
	}
}
