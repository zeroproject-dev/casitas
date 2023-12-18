import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDTO } from '@domain/dto/user.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOneByUnique(username);
		if (user?.comparePassword(pass)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	async login(user: any) {
		const payload = { id: user.id, username: user.username, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async validateToken(token: string) {
		this.jwtService.decode(token);
	}

	async register(user: UserCreateDTO) {
		return this.usersService.create(user);
	}
}
