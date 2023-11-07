import { Component } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
})
export class NavbarComponent {
	isLoged: boolean = true;
	isMenuOpen: boolean = false;

	constructor() {}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}
}
