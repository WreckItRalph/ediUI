import { Component, OnInit, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	constructor() { }
  @Input() category: FormGroup;

	ngOnInit() {
	}


	moveUp() {

	}

	moveDown() {

	}
}
