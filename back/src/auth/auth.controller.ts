import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@HttpCode(HttpStatus.OK)
	@Post('validate_token')
	async validateToken(@Body() { token }: { token: string }) {
		return this.authService.validateToken(token);
	}
}
