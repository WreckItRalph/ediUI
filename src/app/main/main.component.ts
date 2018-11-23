import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { EDI } from '../EDI';


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

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.ediObject = {
			header: {
				templateId: "Template ID",
				templateName: "Template Name",
				date: "Date"
			},
			categories: [
				{
					name: "Category 1",
					categroyID: "Category ID 1_1",
					fields: [
						{
							name: "Field Name 1_1",
							id: "Field ID 1_1"
						},
						{
							name: "Field Name 1_2",
							id: "Field ID 1_2"
						}
					]
				},
				{
					name: "Category 2",
					categroyID: "Category ID 2",
					fields: [
						{
							name: "Field Name 2_1",
							id: "Field ID 2_1"
						},
						{
							name: "Field Name 2_2",
							id: "Field ID 2_2"
						}
					]
				}
			]

		};

		this.ediForm = this.formBuilder.group({});
		this.createFormFromObject(this.ediForm, this.ediObject);



	}



	public dummyClick() {
		console.log(this);
	}

	private createFormFromObject(form: FormGroup, object: any) {
		Object.keys(object).forEach(key => {
			if (Array.isArray(object[key])){
				form.addControl(key, this.formBuilder.array([]));
				if (object[key].length != 0){
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

	private createFormFromArray(form: FormArray, object: any[]){
		object.forEach(obj => {
			let temp = this.formBuilder.group({});
			form.push(temp);
			this.createFormFromObject(temp, obj);
		});
	}

	dummy(){
		console.log(this);
	}

	

	


}
