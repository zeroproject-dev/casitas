import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
	rounds = 10;

	hash(data: string): Promise<string> {
		return bcrypt.hash(data, this.rounds);
	}

	compare(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
