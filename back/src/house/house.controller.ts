import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
	UseGuards,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseCreateDTO, HouseUpdateDTO } from '@domain/dto/house.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('houses')
export class HouseController {
	constructor(private readonly houseService: HouseService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Req() req: Request, @Body() createHouseDto: HouseCreateDTO) {
		console.log(req.user);
		console.log(createHouseDto);
		return 'holi';
		// return this.houseService.create(createHouseDto);
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
