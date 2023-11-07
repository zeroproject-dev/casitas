import { UserCreateDTO, UserUpdateDTO } from '@domain/dto/user.dto';
import {
	IUserRepository,
	UserFilters,
} from '@domain/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Paginator } from 'commons/paginator';

@Injectable()
export class UserService {
	constructor(
		@Inject('IUserRepository') private readonly userRepository: IUserRepository,
	) {}

	async create(data: UserCreateDTO) {
		return await this.userRepository.create(data);
	}

	async findAll(filters: UserFilters, pag: Paginator) {
		return await this.userRepository.getAll(filters, pag);
	}

	async findOne(id: number) {
		return await this.userRepository.getById(id);
	}

	async findOneByUnique(key: string) {
		return await this.userRepository.getByUniqueField(key);
	}

	async update(data: UserUpdateDTO) {
		return await this.userRepository.update(data);
	}

	async remove(id: number) {
		return await this.userRepository.delete(id);
	}
}
