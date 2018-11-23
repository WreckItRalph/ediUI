import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { HeaderObject } from '../models/header-object';
import { FormService, AppService } from '../services';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public form: FormGroup;
	public lobValues$: Observable<string[]>;
	public agencies$: Observable<string[]>;
	public templates$: Observable<string[]>;
	public versions$: Observable<string[]>;
	constructor(private formBuilder: FormBuilder, private formService: FormService,
		private appService: AppService			
			) { }

	ngOnInit() {
		this.form = this.formBuilder.group({});
		let obj = new HeaderObject();
		this.formService.createFormFromObject(this.form, obj);
		this.lobValues$ = this.appService.lobValues$.asObservable();
		this.agencies$ = this.appService.agencies$.asObservable();
		this.templates$ = this.appService.templates$.asObservable();
		this.versions$ = this.appService.versions$.asObservable();
		this.appService.getLOBs();
		this.lobValues$.subscribe(lobValues => {
			if (lobValues.length == 0){
				this.form.get('lob').disable();
			}else{
				this.form.get('lob').enable();
			}
		});
		this.agencies$.subscribe(agencies => {
			if (agencies.length == 0){
				this.form.get('agency').disable();
			}else{
				this.form.get('agency').enable();
			}
		});
		this.templates$.subscribe(templates => {
			if (templates.length == 0){
				this.form.get('template').disable();
			}else{
				this.form.get('template').enable();
			}
		});
		this.versions$.subscribe(versions => {
			if (versions.length == 0){
				this.form.get('version').disable();
			}else{
				this.form.get('version').enable();
			}
		});
		
	}

	public onLOBSelect(event: any){
		this.resetFormControls(['agency','template','version']);
		this.appService.getAgencies(event.target.value);
		
	}

	public onAgencySelect(event: any){
		this.resetFormControls(['template','version']);
		this.appService.getTemplates(event.target.value);
	}

	public onTemplateSelect(event: any){
		this.resetFormControls(['version']);
		this.appService.getVersions(event.target.value);
	}

	public getTemplate(){
		this.appService.getDetails(this.form.getRawValue());
	}

	private resetFormControls(controlNames: string[]){
		controlNames.forEach(control => this.form.get(control).reset());
	}
	
}

