import { User } from '@prisma/client';
import { UserEntity } from 'domain/entities';

export class UserMapper {
	static fromPrisma(prismaUser: User): UserEntity {
		const user = new UserEntity();
		return Object.assign(user, prismaUser);
	}
}
