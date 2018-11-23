import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FormService } from '../services';
import { EDI, Category } from '../models/EDI';


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	title = 'ediUI';
	ediObject: EDI;
	ediForm: FormGroup;
	templateList = [
		't1',
		't2'
	]
	private uiSettings:any[];

	constructor(private formBuilder: FormBuilder,
		private formService: FormService) { }

	ngOnInit() {
		this.ediObject = {
			templateName: 'templateName',
			templateTimestamp: '',
			categories: [
				{
					name: "Category 1",
					categoryId: "Category ID 1",
					fields: [
						{
							AL3Id : 'ALS ID 1_1',
							AL3ShortDescription : 'ALS Des 1_1',
							FormCaption : 'Cap 1_1'
						},
						{
							AL3Id : 'ALS ID 1_2',
							AL3ShortDescription : 'ALS Des 1_2',
							FormCaption : 'Cap 1_2'
						}
					]
				},
				{
					name: "Category 2",
					categoryId: "Category ID 1",
					fields: [
						{
							AL3Id : 'ALS ID 1_1',
							AL3ShortDescription : 'ALS Des 1_1',
							FormCaption : 'Cap 1_1'
						},
						{
							AL3Id : 'ALS ID 1_2',
							AL3ShortDescription : 'ALS Des 1_2',
							FormCaption : 'Cap 1_2'
						}
					]
				},
				{
					name: "Category 3",
					categoryId: "Category ID 1",
					fields: [
						{
							AL3Id : 'ALS ID 1_1',
							AL3ShortDescription : 'ALS Des 1_1',
							FormCaption : 'Cap 1_1'
						},
						{
							AL3Id : 'ALS ID 1_2',
							AL3ShortDescription : 'ALS Des 1_2',
							FormCaption : 'Cap 1_2'
						}
					]
				},
				{
					name: "Category 4",
					categoryId: "Category ID 2",
					fields: [
						{
							AL3Id : 'ALS ID 2_1',
							AL3ShortDescription : 'ALS Des 2_1',
							FormCaption : 'Cap 2_1'
						},
						{
							AL3Id : 'ALS ID 2_2',
							AL3ShortDescription : 'ALS Des 2_2',
							FormCaption : 'Cap 2_2'
						}
					]
				}
				
			]

		};

		this.ediForm = this.formBuilder.group({});
		this.formService.createFormFromObject(this.ediForm, this.ediObject);
	}


	dummy() {
		console.log(this);
	}

	deleteCategory(index: number) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		categoryForm.removeAt(index);
	}

	addCategory(index: number) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		let newCategory = new Category();
		this.formService.addControlFromObject(categoryForm, newCategory, index);
	}

	updateUISettings(index){
		this.uiSettings[index] = !this.uiSettings[index];
	}


	drop(event: CdkDragDrop<string[]>) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		moveItemInArray(categoryForm.controls, event.previousIndex, event.currentIndex);
	  }




}
