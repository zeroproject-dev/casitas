import { HouseEntity } from './house.entity';

export interface UserEntity {
	id: number;
	email: string;
	name: string;
	lastname: string;
	username: string;
	password: string;

	houses: HouseEntity[];

	createdAt: Date;
	updatedAt: Date;
}
