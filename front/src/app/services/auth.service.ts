import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../entities/user.entity';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private baseUrl: string;
	private httpClient = inject(HttpClient);
	private router = inject(Router);
	public isLogged = false;

	constructor() {
		this.baseUrl = `${environment.apiUrl}/auth`;
	}

	login(formValue: any): Promise<{ access_token: string }> {
		const res = this.httpClient.post<{ access_token: string }>(
			`${this.baseUrl}/login`,
			formValue,
		);
		this.isLogged = true;
		return firstValueFrom(res);
	}

	register(formValue: any): Promise<UserEntity> {
		const res = this.httpClient.post<UserEntity>(
			`${this.baseUrl}/register`,
			formValue,
		);
		return firstValueFrom(res);
	}

	validateAccessToken(): boolean {
		const token = localStorage.getItem('access_token');

		if (token === undefined) {
			this.logout();
			return false;
		}

		try {
			this.httpClient.post<{ token: string }>(
				`${this.baseUrl}/validate_token`,
				{ token },
			);
			return true;
		} catch (error) {
			this.logout();
			return false;
		}
	}

	logout() {
		localStorage.removeItem('access_token');
		this.isLogged = false;
		this.router.navigate(['./']);
	}
}
