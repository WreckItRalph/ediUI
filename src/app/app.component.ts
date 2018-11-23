import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'ediUI';
	ediObject: EDI;
	ediForm: FormGroup;
	constructor(private formBuilder: FormBuilder){

	}


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

	addField(){

	}

	public dummyClick(){
		console.log(this);
	}

	private createFormFromObject(form: FormGroup, object: any){
		Object.keys(object).forEach(key => {
			if (typeof object[key] == "object"){
				form.addControl(key,this.formBuilder.group({}));
				this.createFormFromObject(form.controls[key] as FormGroup, object[key]);
			}else{
				form.addControl(key, this.formBuilder.control(''));
			}
		});
	}

	moveUp(event){

	}
	
	moveDown(event){

	}
}



export class EDI {
	header: Header;
	categories: Category[];
  }
  
  interface Category {
	name: string;
	categroyID: string;
	fields: Field[];
  }
  
  interface Field {
	name: string;
	id: string;
  }
  
  interface Header {
	templateId: string;
	templateName: string;
	date: string;
  }