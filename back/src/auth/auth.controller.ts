import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}
}
