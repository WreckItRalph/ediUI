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

	public addField(index: number = -1){
		let fieldForm = this.category.controls['fields'] as FormArray;
		let newField = new Field();
		this.formService.addControlFromObject(fieldForm, newField, false, index);
	}

	public deleteField(index: number){
		let fieldForm = this.category.controls['fields'] as FormArray;
		fieldForm.removeAt(index);
	}
	
	public categoryClicked(){
		this.clicked = !this.clicked;
	}

	public drop(event: CdkDragDrop<string[]>) {
		let fieldForm = this.category.controls['fields'] as FormArray;
		moveItemInArray(fieldForm.controls, event.previousIndex, event.currentIndex);
	}
}
