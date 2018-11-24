import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { HeaderObject } from '../models/header-object';
import { FormService, AppService } from '../services';
import { Observable, Subscription } from 'rxjs';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

	@Input() form: FormGroup;
	public lobValues$: Observable<string[]>;
	public agencies$: Observable<string[]>;
	public templates$: Observable<string[]>;
	public versions$: Observable<string[]>;
	private subscriptions: Subscription[] = [];
	constructor(private formBuilder: FormBuilder, private formService: FormService,
		private appService: AppService			
			) { }

	ngOnInit() {
		
		this.lobValues$ = this.appService.lobValues$.asObservable();
		this.agencies$ = this.appService.agencies$.asObservable();
		this.templates$ = this.appService.templates$.asObservable();
		this.versions$ = this.appService.versions$.asObservable();
		this.appService.getLOBs();
		let subscription;
		subscription = this.lobValues$.subscribe(lobValues => {
			if (lobValues.length == 0){
				this.form.get('lob').disable();
			}else{
				this.form.get('lob').enable();
			}
		});
		this.subscriptions.push(subscription);
		subscription = this.agencies$.subscribe(agencies => {
			if (agencies.length == 0){
				this.form.get('agency').disable();
			}else{
				this.form.get('agency').enable();
			}
		});
		this.subscriptions.push(subscription);
		subscription = this.templates$.subscribe(templates => {
			if (templates.length == 0){
				this.form.get('template').disable();
			}else{
				this.form.get('template').enable();
			}
		});
		this.subscriptions.push(subscription);
		subscription = this.versions$.subscribe(versions => {
			if (versions.length == 0){
				this.form.get('version').disable();
			}else{
				this.form.get('version').enable();
			}
		});
		this.subscriptions.push(subscription);
		
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
	
	ngOnDestroy(){
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
		this.subscriptions = [];
	}
}

