import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDTO, UserUpdateDTO } from '@domain/dto/user.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() data: UserCreateDTO) {
		return this.userService.create(data);
	}

	@Get()
	async findAll() {
		const res = await this.userService.findAll(null, null);
		return res;
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const user = await this.userService.findOne(+id);
		if (user == null)
			throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

		return user;
	}

	@Patch(':id')
	update(@Body() data: UserUpdateDTO) {
		return this.userService.update(data);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
