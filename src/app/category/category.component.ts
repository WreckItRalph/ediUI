import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	@Input() category: FormArray;
	constructor() { }

	ngOnInit() {
	}


	moveFieldUp(index: number) {
		let fieldForm = this.category.controls['fields'];
		let temp = fieldForm.controls[index-1];
		fieldForm.controls[index-1] = fieldForm.controls[index];
		fieldForm.controls[index] = temp;
	}

	moveFieldDown(index: number) {
		let fieldForm = this.category.controls['fields'];
		let temp = fieldForm.controls[index+1];
		fieldForm.controls[index+1] = fieldForm.controls[index];
		fieldForm.controls[index] = temp;
	}

	addField(index: number){

	}

	removeField(index: number){

	}
}
