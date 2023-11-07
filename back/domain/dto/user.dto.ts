export class UserCreateDTO {
	email: string;
	name: string;
	lastname: string;
	username: string;
	password: string;
}

export class UserUpdateDTO {
	id: number;
	email: string;
	name: string;
	lastname: string;
	username: string;
}
