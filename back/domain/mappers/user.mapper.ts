import { User } from '@prisma/client';
import { UserEntity } from 'domain/entities';

export class UserMapper {
	static fromPrisma(prismaUser: User): UserEntity | null {
		if (prismaUser) {
			const user = new UserEntity();
			return Object.assign(user, prismaUser);
		}
		return null;
	}
}
