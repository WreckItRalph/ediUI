import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FormService, AppService } from '../services';
import { EDI, Category } from '../models/EDI';
import { Observable } from 'rxjs/internal/Observable';

const jk = JSON;
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	title = 'ediUI';
	json = JSON;
	public ediObject: EDI;
	public ediForm: FormGroup;
	private uiSettings:any[];
	public templateData$: Observable<string[]>;

	constructor(private formBuilder: FormBuilder,
		private formService: FormService,private appService: AppService) { }

	ngOnInit() {
		this.templateData$ = this.appService.templateData$.asObservable();
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

		this.reset();
	}

	public	deleteCategory(index: number) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		categoryForm.removeAt(index);
	}

	public addCategory(index: number = -1) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		let newCategory = new Category();
		this.formService.addControlFromObject(categoryForm, newCategory,false, index);
	}

	public updateUISettings(index){
		this.uiSettings[index] = !this.uiSettings[index];
	}

	
	saveTemplate(){
		let vals = this.ediForm.getRawValue();
		vals.templateTimestamp = new Date().toISOString();
		console.log(vals);
	}

	public drop(event: CdkDragDrop<string[]>) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		moveItemInArray(categoryForm.controls, event.previousIndex, event.currentIndex);
	  }

	public reset(){
		this.ediForm = this.formBuilder.group({});
		if(this.ediObject){
			this.formService.createFormFromObject(this.ediForm, this.ediObject, true);
		}		
	}
}
