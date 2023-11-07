import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '@domain/repositories/user.repository';

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		{
			provide: 'IUserRepository',
			useClass: PrismaUserRepository,
		},
	],
})
export class UserModule {}
