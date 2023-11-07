import * as bcrypt from 'bcrypt';
import { HouseEntity } from './house.entity';

export class UserEntity {
	id: number;
	email: string;
	name: string;
	lastname: string;
	username: string;
	password: string;

	houses: HouseEntity[];

	createdAt: Date;
	updatedAt: Date;

	comparePassword(pass: string): Promise<boolean> {
		return bcrypt.compare(pass, this.password);
	}
}
