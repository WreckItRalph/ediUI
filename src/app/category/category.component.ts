import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormService, AppService } from '../services';
import { Field } from '../models/EDI';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	@Input() category: FormArray;
	@Input() settings:any;
	@Input() categoryIndex:number;
	clicked:boolean = false;
	constructor(private formService: FormService) { }

	ngOnInit() {
	}

	getId(){
		return `#${this.categoryIndex}`
	}

	addField(index: number){
		let fieldForm = this.category.controls['fields'] as FormArray;
		let newField = new Field();
		this.formService.addControlFromObject(fieldForm, newField, index);
	}

	deleteField(index: number){
		let fieldForm = this.category.controls['fields'] as FormArray;
		fieldForm.removeAt(index);
	}
	
	categoryClicked(){
		this.clicked = !this.clicked;
	}

	drop(event: CdkDragDrop<string[]>) {
		let fieldForm = this.category.controls['fields'] as FormArray;
		moveItemInArray(fieldForm.controls, event.previousIndex, event.currentIndex);
	}
}
