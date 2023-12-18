import { UserEntity } from './user.entity';

interface Point {
	lat: number;
	lng: number;
}

export class HouseEntity {
	id: number;

	name: string;
	cost: number;
	description: string;
	pos: Point;
	User: UserEntity;

	createdAt: Date;
	updatedAt: Date;
}
