import {
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('favorite')
export class FavoriteController {
	constructor(private readonly favoriteService: FavoriteService) {}

	@UseGuards(JwtAuthGuard)
	@Post(':houseId')
	addFavorite(
		@Req() req: Request,
		@Param('houseId', ParseIntPipe) houseId: number,
	) {
		const userId = (req.user as any)?.userId;
		if (!userId) {
			throw new HttpException(
				'Error al obtener el usuario',
				HttpStatus.NOT_FOUND,
			);
		}

		return this.favoriteService.addFavorite(userId, houseId);
	}

	@Get('')
	@UseGuards(JwtAuthGuard)
	async getFavorites(@Req() req: Request) {
		const userId = (req.user as any)?.userId;
		if (!userId) {
			throw new HttpException(
				'Error al obtener el usuario',
				HttpStatus.NOT_FOUND,
			);
		}
		const res = await this.favoriteService.getHouses(userId);

		return res;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':houseId')
	removeFavorite(
		@Req() req: Request,
		@Param('houseId', ParseIntPipe) houseId: number,
	) {
		const userId = (req.user as any)?.userId;
		if (!userId) {
			throw new HttpException(
				'Error al obtener el usuario',
				HttpStatus.NOT_FOUND,
			);
		}

		return this.favoriteService.removeFavorite(userId, houseId);
	}
}
