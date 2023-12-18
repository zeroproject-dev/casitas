import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LatLng, Marker, tileLayer } from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { HouseService } from 'src/app/services/house.service';
import { START_MAP } from 'src/lib/contants';

interface Point {
	lat: number;
	lng: number;
}

@Component({
	selector: 'app-offer',
	templateUrl: './offer.component.html',
})
export class OfferComponent {
	form!: FormGroup;

	houseService = inject(HouseService);
	router = inject(Router);
	title = inject(Title);
	toast = inject(ToastrService);
	submited = false;

	mapOptions = {
		layers: [
			tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: 'OpenStreetMap',
			}),
		],
	};
	layers = [];
	zoom = START_MAP.zoom;
	center: LatLng = new LatLng(START_MAP.lat, START_MAP.lng);

	marker!: Marker;

	point: Point | null = null;

	constructor(private formBuilder: FormBuilder) {
		this.title.setTitle('Casitas - Ofrecer');
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			name: ['', [Validators.required]],
			cost: ['', [Validators.required]],
			description: ['', [Validators.required]],
		});
	}

	onMapReady(map: any) {
		map.doubleClickZoom.disable();
		map.on('dblclick', (event: any) => this.onMapDoubleClick(event, map));
	}

	onMapDoubleClick(event: any, map: any) {
		const latlng: LatLng = event.latlng;

		if (this.marker) {
			map.removeLayer(this.marker);
		}

		this.marker = new Marker(latlng, { draggable: true })
			.addTo(map)
			.on('dragend', () => this.onMarkerDragEnd(map));

		this.point = { lat: latlng.lat, lng: latlng.lng };
	}

	onMarkerDragEnd(map: any) {
		const latlng: LatLng = this.marker.getLatLng();

		this.point = { lat: latlng.lat, lng: latlng.lng };
	}

	async onSubmit() {
		try {
			this.submited = true;
			if (this.point === null) {
				this.toast.error('Seleccione una ubicación', 'Error');
				return;
			}
			if (!this.form.valid) return;

			const formJson = { ...this.form.value, pos: this.point };

			const res = await this.houseService.create(formJson);
			this.toast.success(
				`Oferta de ${res.name} creada correctamente`,
				'Correcto',
			);
			this.router.navigate(['./search']);
		} catch (error) {
			if (error instanceof HttpErrorResponse) {
				this.toast.error(error.error['message'], 'Error');
			}
		}
	}

	isValidInput(name: string, field: string) {
		const errors = this.form.get(name)?.errors;
		if (errors) return errors[field];
		return false;
	}
}
