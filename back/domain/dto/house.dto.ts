import { GJSONObject } from '@domain/entities';

export class HouseCreateDTO {
	name: string;
	cost: string;
	description: string;
	pos: any;
}

export class HouseUpdateDTO {
	id: number;

	name: string;
	cost: number;
	description: string;
	pos: GJSONObject;
}
