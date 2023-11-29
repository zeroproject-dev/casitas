import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PrismaUserRepository } from '@domain/repositories/user.repository';
import { HashingService } from './hashing.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	providers: [
		AuthService,
		UserService,
		{
			provide: 'IUserRepository',
			useClass: PrismaUserRepository,
		},
		HashingService,
		LocalStrategy,
		JwtStrategy,
	],
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: 'thisisasecret',
			signOptions: { expiresIn: '1h' },
		}),
	],
	exports: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
