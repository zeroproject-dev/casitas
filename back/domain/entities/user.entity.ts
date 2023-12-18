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

	constructor({
		id,
		email,
		name,
		lastname,
		username,
		password,
		createdAt,
		updatedAt,
	}: {
		id: number;
		email: string;
		name: string;
		lastname: string;
		username: string;
		password: string;
		createdAt: any;
		updatedAt: any;
	}) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.lastname = lastname;
		this.username = username;
		this.password = password;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	comparePassword(pass: string): Promise<boolean> {
		return bcrypt.compare(pass, this.password);
	}
}
