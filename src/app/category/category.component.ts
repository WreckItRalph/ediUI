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
		let temp = this.category.controls['fields'][index-1];
		this.category.controls['fields'][index-1] = this.category.controls['fields'][index];
		this.category.controls['fields'][index] = temp;
	}

	moveFieldDown(index: number) {
		let temp = this.category.controls['fields'][index+1];
		this.category.controls['fields'][index+1] = this.category.controls['fields'][index];
		this.category.controls['fields'][index] = temp;
	}

	addField(index: number){

	}

	removeField(index: number){

	}
}
