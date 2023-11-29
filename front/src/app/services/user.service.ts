import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserEntity } from '../entities/user.entity';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private baseUrl: string;
	private httpClient = inject(HttpClient);

	constructor() {
		this.baseUrl = `${environment.apiUrl}/users`;
	}

	getUser(id: string): Promise<UserEntity> {
		const res = this.httpClient.get<UserEntity>(`${this.baseUrl}/${id}`);
		return firstValueFrom(res);
	}

	listUsers(): Promise<UserEntity[]> {
		const res = this.httpClient.get<UserEntity[]>(`${this.baseUrl}/`);
		return firstValueFrom(res);
	}

	createUser(formValue: any): Promise<UserEntity> {
		const res = this.httpClient.post<UserEntity>(`${this.baseUrl}/`, formValue);
		return firstValueFrom(res);
	}
}
