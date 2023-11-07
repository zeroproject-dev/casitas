import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserEntity } from '@domain/entities';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private baseUrl: string;
	private httpClient = inject(HttpClient);

	constructor() {
		this.baseUrl = 'http://localhost:3300/api/v1';
	}

	login(formValue: any): Promise<UserEntity> {
		const res = this.httpClient.post<UserEntity>(
			`${this.baseUrl}/auth/login`,
			formValue,
		);
		return firstValueFrom(res);
	}

	listUsers(): Promise<UserEntity[]> {
		const res = this.httpClient.get<UserEntity[]>(`${this.baseUrl}/users/`);
		return firstValueFrom(res);
	}

	createUser(formValue: any): Promise<UserEntity> {
		const res = this.httpClient.post<UserEntity>(
			`${this.baseUrl}/users/`,
			formValue,
		);
		return firstValueFrom(res);
	}
}
