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
		
	}

	temp:string[] = [
		'ABCD', 'EFGH', 'IJKL', 'MNOP'
	]

	onLOBSelect(LOB: string){
		this.appService.getAgencies(LOB);
	}

	onAgencySelect(agency: string){
		this.appService.getTemplates(agency);
	}

	onTemplateSelect(template: string){
		this.appService.getVersions(template);
	}

	getTemplate(){
		this.appService.getDetails(this.form.getRawValue());
	}


	
}

