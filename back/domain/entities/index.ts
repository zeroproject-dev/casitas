import { UserEntity } from './user.entity';
import { HouseEntity } from './house.entity';

export interface GJSONObject {
	type: string;
	properties: Properties;
	geometry: Geometry;
}

export interface Geometry {
	type: string;
	coordinates: number[];
}

export interface Properties {
	name: string;
	showOnMap: boolean;
}

export { UserEntity, HouseEntity };
