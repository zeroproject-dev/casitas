import { Injectable, inject } from '@angular/core';
import { HouseEntity } from '../entities/house.entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HouseService {
	private baseUrl: string;
	private httpClient = inject(HttpClient);

	constructor() {
		this.baseUrl = `${environment.apiUrl}/houses`;
	}

	create(formValue: any): Promise<HouseEntity> {
		const token = localStorage.getItem('access_token');
		if (token === null) {
			throw new Error('Falta token');
		}

		const res = this.httpClient.post<HouseEntity>(
			`${this.baseUrl}/`,
			formValue,
			{ headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) },
		);
		return firstValueFrom(res);
	}
}
