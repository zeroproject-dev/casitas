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

	createdAt: Date;
	updatedAt: Date;
}
