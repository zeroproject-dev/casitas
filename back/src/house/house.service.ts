import { HouseCreateDTO, HouseUpdateDTO } from '@domain/dto/house.dto';
import {
	HouseFilters,
	IHouseRepository,
} from '@domain/repositories/house.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Paginator } from 'commons/paginator';

@Injectable()
export class HouseService {
	constructor(
		@Inject('IHouseRepository')
		private readonly houseRepository: IHouseRepository,
	) {}

	async create(userId: number, data: HouseCreateDTO) {
		return await this.houseRepository.create(userId, data);
	}

	async findAll(filters: HouseFilters, pag: Paginator) {
		return await this.houseRepository.getAll(filters, pag);
	}

	async findOne(id: number) {
		return await this.houseRepository.getById(id);
	}

	async update(data: HouseUpdateDTO) {
		return await this.houseRepository.update(data);
	}

	async remove(id: number) {
		return await this.houseRepository.delete(id);
	}

	async getAllWithFavoritesOf(userId: number) {
		return await this.houseRepository.getAllWithFavoritesOf(userId);
	}
}
