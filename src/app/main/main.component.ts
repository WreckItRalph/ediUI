import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { EDI, Category } from '../EDI';
import { FormService } from '../form-service.service';


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

	moveCategoryUp(index: number) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		let temp = categoryForm.controls[index-1];
		categoryForm.controls[index-1] = categoryForm.controls[index];
		categoryForm.controls[index] = temp;
	}

	moveCategoryDown(index: number) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		let temp = categoryForm.controls[index+1];
		categoryForm.controls[index+1] = categoryForm.controls[index];
		categoryForm.controls[index] = temp;
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






}
