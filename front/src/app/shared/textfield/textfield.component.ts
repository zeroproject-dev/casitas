import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-textfield',
	templateUrl: './textfield.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextfieldComponent),
			multi: true,
		},
	],
})
export class TextfieldComponent implements OnInit, ControlValueAccessor {
	value: any = false;
	isDisabled: boolean = false;

	@Input() type: string = 'text';
	@Input() name: string = '';
	@Input() label: string = 'NO-LABEL';
	@Input() isInvalid: boolean = false;

	constructor() {}

	ngOnInit(): void {}

	writeValue(obj: any): void {
		this.value = obj ?? '';
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	onChange(_a: any): void {}
	onTouched(): void {}
	onInput(value: any) {
		if (value != null) {
			this.value = value.target.value;
			this.onChange(this.value);
			this.onTouched();
		}
	}
}
