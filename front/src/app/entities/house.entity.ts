import { UserEntity } from './user.entity';

export interface HouseEntity {
	id: number;

	User: UserEntity;
	name: string;
	cost: number;
	description: string;
	pos: any;

	isFavorite?: boolean;

	createdAt: Date;
	updatedAt: Date;
}
