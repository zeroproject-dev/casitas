import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseCreateDTO, HouseUpdateDTO } from '@domain/dto/house.dto';

@Controller('house')
export class HouseController {
	constructor(private readonly houseService: HouseService) {}

	@Post()
	create(@Body() createHouseDto: HouseCreateDTO) {
		return this.houseService.create(createHouseDto);
	}

	@Get()
	findAll() {
		return this.houseService.findAll(null, null);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.houseService.findOne(+id);
	}

	@Patch(':id')
	update(@Body() updateHouseDto: HouseUpdateDTO) {
		return this.houseService.update(updateHouseDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.houseService.remove(+id);
	}
}
