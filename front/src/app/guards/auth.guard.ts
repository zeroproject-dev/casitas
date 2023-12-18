import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	const isAuthorized = authService.validateAccessToken();

	if (!isAuthorized) router.navigate(['./']);

	return isAuthorized;
};
