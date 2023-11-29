import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { UserCreateDTO } from '@domain/dto/user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req: Request) {
		return this.authService.login(req.user);
	}

	@Post('register')
	async register(@Body() body: UserCreateDTO) {
		return this.authService.register(body);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@Post('validate_token')
	async validateToken(@Body() { token }: { token: string }) {
		return this.authService.validateToken(token);
	}
}
