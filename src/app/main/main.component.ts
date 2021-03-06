import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { FormService, AppService } from '../services';
import { EDI, Category } from '../models/EDI';
import { Observable } from 'rxjs/internal/Observable';
import { HeaderObject } from '../models/header-object';

const jk = JSON;
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

	title = 'ediUI';
	json = JSON;
	public ediObject: EDI;
	public ediForm: FormGroup;
	public fileName: string;
	public templateData$: Observable<EDI>;
	private subscriptions = [];
	public headerForm: FormGroup;

	constructor(private formBuilder: FormBuilder,
	private formService: FormService, private appService: AppService) { }

	ngOnInit() {
		this.headerForm = this.formBuilder.group({});
		let obj = new HeaderObject();
		this.formService.createFormFromObject(this.headerForm, obj);
		this.templateData$ = this.appService.templateData$.asObservable();
		let templateSubcription = this.templateData$.subscribe(data => {
			this.ediObject = data;
			this.reset();
		});
		this.subscriptions.push(templateSubcription);
	}

	public deleteCategory(index: number) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		categoryForm.removeAt(index);
	}

	public addCategory(index: number = -1) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		let newCategory = new Category();
		this.formService.addControlFromObject(categoryForm, newCategory, false, index);
	}



	saveTemplate() {

		let newEdiObject: EDI = this.ediForm.getRawValue();
		this.appService.saveTemplate(newEdiObject);
	}

	public generateDate() {
		let formValue = this.headerForm.getRawValue();
		let today = new Date();
		let templateName = `${formValue.agency}-${formValue.template} ${today.toUTCString().substr(today.toUTCString().indexOf(',')+2)}`
		this.ediForm.patchValue({
			templateTimestamp: new Date().toISOString(),
			templateName: templateName.replace(/:/g,"-")
		});
		this.fileName = this.ediForm.controls['templateName'].value;
	}

	public drop(event: CdkDragDrop<string[]>) {
		let categoryForm = this.ediForm.controls['categories'] as FormArray;
		moveItemInArray(categoryForm.controls, event.previousIndex, event.currentIndex);
	}

	public reset() {
		this.ediForm = this.formBuilder.group({});
		if (this.ediObject) {
			this.formService.createFormFromObject(this.ediForm, this.ediObject, true);
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
		this.subscriptions = [];
	}
}
