import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../entities/user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private baseUrl: string;
	private httpClient = inject(HttpClient);

	constructor() {
		this.baseUrl = `${environment.apiUrl}/auth`;
	}

	login(formValue: any): Promise<{ token: string }> {
		const res = this.httpClient.post<{ token: string }>(
			`${this.baseUrl}/login`,
			formValue,
		);
		return firstValueFrom(res);
	}

	register(formValue: any): Promise<UserEntity> {
		const res = this.httpClient.post<UserEntity>(
			`${this.baseUrl}/register`,
			formValue,
		);
		return firstValueFrom(res);
	}

	validateToken(token: string | undefined): boolean {
		if (token === undefined) return false;
		try {
			this.httpClient.post<{ token: string }>(
				`${this.baseUrl}/validate_token`,
				{ token },
			);
			return true;
		} catch (error) {
			return false;
		}
	}
}
