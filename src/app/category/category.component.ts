import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	@Input() category: FormGroup;
	constructor() { }

	ngOnInit() {
	}


	moveUp() {

	}

	moveDown() {

	}

	addCategory(){

	}

	removeCategory(){

	}
}
