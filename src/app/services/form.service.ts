import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class FormService {

	constructor(private formBuilder: FormBuilder) { }

	public createFormFromObject(form: FormGroup, object: any) {
		Object.keys(object).forEach(key => {
			if (Array.isArray(object[key])) {
				form.addControl(key, this.formBuilder.array([]));
				if (object[key].length != 0) {
					this.createFormFromArray(form.controls[key] as FormArray, object[key]);
				}
			}
			else if (typeof object[key] == "object") {
				form.addControl(key, this.formBuilder.group({}));
				this.createFormFromObject(form.controls[key] as FormGroup, object[key]);
			} else {
				form.addControl(key, this.formBuilder.control(object[key]));
			}
		});
	}

	public createFormFromArray(form: FormArray, object: any[]) {
		object.forEach(obj => {
			let temp = this.formBuilder.group({});
			form.push(temp);
			this.createFormFromObject(temp, obj);
		});
	}

	public addControlFromObject(form: FormArray, object: any, index: number = -1) {
		let tempForm = this.formBuilder.group({});
		this.createFormFromObject(tempForm, object);
		if (index != -1) {
			form.insert(index+1, tempForm);
		} else {
			form.push(tempForm);
		}

	}

}
