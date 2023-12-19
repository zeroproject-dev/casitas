import {
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
	constructor(private readonly favoriteService: FavoriteService) {}

	@Post(':userId/:houseId')
	addFavorite(
		@Param('userId', ParseIntPipe) userId: number,
		@Param('houseId', ParseIntPipe) houseId: number,
	) {
		return this.favoriteService.addFavorite(userId, houseId);
	}

	@Get(':userId')
	getFavorites(@Param('userId', ParseIntPipe) userId: number) {
		return this.favoriteService.getFavoritesByUserId(userId);
	}

	@Delete(':userId/:houseId')
	removeFavorite(
		@Param('userId', ParseIntPipe) userId: number,
		@Param('houseId', ParseIntPipe) houseId: number,
	) {
		return this.favoriteService.removeFavorite(userId, houseId);
	}
}
