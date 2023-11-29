import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HouseEntity } from 'src/app/entities/house.entity';
import { SearchService } from 'src/app/services/search.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
})
export class SearchComponent {
	houses: HouseEntity[] = [];
	filteredHouses: HouseEntity[] = [];
	searchText: string = '';
	filters = {
		costRange: { min: 0, max: 1000000 },
	};

	constructor(private searchService: SearchService) {}

	ngOnInit(): void {
		this.searchService.searchQuery$
			.pipe(debounceTime(300), distinctUntilChanged())
			.subscribe((query) => this.search(query));
	}

	search(query: string): void {
		// Aplicar lógica de búsqueda y filtros
		this.searchService.searchHouses(query, this.filters).subscribe((houses) => {
			this.houses = houses;
			this.applySearchTextFilter();
		});
	}

	applySearchTextFilter(): void {
		this.filteredHouses = this.houses.filter(
			(house) =>
				house.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
				house.description.toLowerCase().includes(this.searchText.toLowerCase()),
		);
	}

	applyFilters(): void {
		// Lógica adicional para ajustar los filtros según sea necesario
		this.searchService.setSearchQuery('');
	}
}
