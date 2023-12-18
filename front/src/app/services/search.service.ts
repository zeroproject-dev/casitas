import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
