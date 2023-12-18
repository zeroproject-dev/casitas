import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
})
export class RegisterComponent {
	form!: FormGroup;

	authService = inject(AuthService);
	router = inject(Router);
	title = inject(Title);
	toast = inject(ToastrService);
	submited = false;

	constructor(private formBuilder: FormBuilder) {
		this.title.setTitle('Casitas - Registro');
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			name: ['', [Validators.required, this.noWhitespaceValidator]],
			lastname: ['', [Validators.required, this.noWhitespaceValidator]],
			username: ['', [Validators.required, this.noWhitespaceValidator]],
			password: ['', [Validators.required, this.noWhitespaceValidator]],
			confirmPassword: ['', [Validators.required]],
		});

		this.form?.get('confirmPassword')?.setValidators((control) => {
			const confirmPassword = control.value;
			const password = this.form?.get('password')?.value;

			if (confirmPassword === password) {
				return null; // Las contraseñas coinciden
			} else {
				return { passwordMismatch: true }; // Las contraseñas no coinciden
			}
		});
	}

	async onSubmit() {
		try {
			this.submited = true;
			if (!this.form.valid) return;

			const { confirmPassword, ...rest } = this.form.value;
			const res = await this.authService.register(rest);
			this.router.navigate(['login']);
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

	noWhitespaceValidator(control: AbstractControl) {
		const isWhitespace = (control.value || '').trim().length === 0;
		const isValid = !isWhitespace;
		return isValid ? null : { whitespace: true };
	}
}
