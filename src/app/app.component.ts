import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'ediUI';
	ediObject: any;

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

		}
	}
}
