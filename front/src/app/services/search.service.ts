import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { HouseEntity } from '../entities/house.entity';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	private searchUrl = `${environment.apiUrl}/houses`;

	private searchQuery = new BehaviorSubject<string>('');
	searchQuery$ = this.searchQuery.asObservable();

	constructor(private http: HttpClient) {}

	getFavoriteHouses(): Promise<HouseEntity[]> {
		const token = localStorage.getItem('access_token');
		if (token === null) {
			const res = this.http.get<HouseEntity[]>(`${this.searchUrl}`);
			return firstValueFrom(res);
		}

		const res = this.http.get<HouseEntity[]>(`${environment.apiUrl}/favorite`, {
			headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
		});
		return firstValueFrom(res);
	}

	searchHouses(query: string, filters: any): Observable<HouseEntity[]> {
		let params = new HttpParams().set('query', query);

		// if (filters.position) {
		// 	params = params.set('lat', filters.position.lat.toString());
		// 	params = params.set('lng', filters.position.lng.toString());
		// }

		if (filters.costRange) {
			params = params.set('minCost', filters.costRange.min.toString());
		}

		return this.http.get<HouseEntity[]>(this.searchUrl, { params });
	}

	setSearchQuery(query: string): void {
		this.searchQuery.next(query);
	}
}
