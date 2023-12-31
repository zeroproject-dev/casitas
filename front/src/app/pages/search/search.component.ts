import 'leaflet-draw';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
	Control,
	Draw,
	DrawEvents,
	FeatureGroup,
	Icon,
	LatLng,
	LayerGroup,
	Map,
	Marker,
	featureGroup,
	tileLayer,
} from 'leaflet';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HouseEntity } from 'src/app/entities/house.entity';
import { SearchService } from 'src/app/services/search.service';
import { HOUSE_ICON, START_MAP } from 'src/lib/constants';
import { HouseService } from 'src/app/services/house.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
})
export class SearchComponent {
	houses: HouseEntity[] = [];
	filteredHouses: HouseEntity[] = [];
	searchText: string = '';
	filters = {
		min: 0,
	};

	map: Map | undefined;
	markerGroup: LayerGroup | undefined;
	mapOptions = {
		layers: [
			tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
			}),
		],
	};

	drawItems: FeatureGroup = featureGroup();

	public onDrawCreated(e: any) {
		this.drawItems.clearLayers();
		const rectangle = (e as DrawEvents.Created).layer;
		this.drawItems.addLayer(rectangle);

		this.markerGroup?.clearLayers();

		this.applyFilters();

		const bounds = this.drawItems.getBounds();
		this.map?.fitBounds(bounds);
	}

	public onDrawDeleted(e: any) {
		this.drawItems.clearLayers();
		this.searchText = '';
		this.filters.min = 0;
		this.applyFilters();
	}

	layers = [];
	zoom = START_MAP.zoom;
	center: LatLng = new LatLng(START_MAP.lat, START_MAP.lng);

	constructor(
		private searchService: SearchService,
		private houseService: HouseService,
		private cdRef: ChangeDetectorRef
	) {}

	onMapReady(map: Map) {
		this.map = map;
		this.markerGroup = new LayerGroup().addTo(map);

		const controls = new Control.Draw({
			position: 'topright',
			draw: {
				circle: false,
				marker: false,
				polygon: false,
				polyline: false,
				circlemarker: false,
				rectangle: { metric: false },
			},
			edit: {
				featureGroup: this.drawItems,
				edit: false,
			},
		});
		map.addControl(controls);
		map.on(Draw.Event.CREATED, (e: any) => this.onDrawCreated(e));
		map.on(Draw.Event.DELETED, (e: any) => this.onDrawDeleted(e));

		map.addLayer(this.drawItems);
	}

	async onFavoriteClick(house: HouseEntity) {
		try {
			let res;
			if (house.isFavorite) {
				res = await this.houseService.removeFavorite(house.id);
			} else {
				res = await this.houseService.addFavorite(house.id);
			}
			console.log(res);
			house.isFavorite = !house.isFavorite;
		} catch (error) {
			//ADD TOAST
		}
	}

	async ngOnInit() {
		this.houses = await this.searchService.getFavoriteHouses();
		this.applyFilters();
	}

	search(query: string): void {
		this.searchService.searchHouses(query, this.filters).subscribe((houses) => {
			this.houses = houses;
			this.applyFilters();
		});
	}

	applyFilters(): void {
		const bounds = this.drawItems.getBounds();
		const withBounds = Object.keys(bounds).length !== 0;

		this.markerGroup?.clearLayers();

		this.filteredHouses = this.houses.filter((house) => {
			let res =
				(house.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
					house.description
						.toLowerCase()
						.includes(this.searchText.toLowerCase())) &&
				house.cost > this.filters.min;

			if (withBounds) {
				const markerLatLng = new LatLng(house.pos.lat, house.pos.lng);
				res = res && bounds.contains(markerLatLng);
			}
			console.log(res);

			if (res) {
				new Marker([house.pos.lat, house.pos.lng], { icon: HOUSE_ICON })
					.bindPopup(`<b>${house.name}</b><br>${house.description}`)
					.addTo(this.markerGroup!);
			}

			return res;
		});
		this.cdRef.detectChanges();
	}
}
