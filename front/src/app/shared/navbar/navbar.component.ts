import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
})
export class NavbarComponent {
	isLoged: boolean = true;
	isMenuOpen: boolean = false;

	constructor(public authService: AuthService) {}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}
}
