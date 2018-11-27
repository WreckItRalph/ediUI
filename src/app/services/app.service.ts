import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { EDI } from '../models/EDI';
import * as FileSaver from 'file-saver';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	public lobValues$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	public agencies$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	public templates$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	public versions$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	public templateData$: BehaviorSubject<EDI> = new BehaviorSubject<EDI>(undefined);
	public fileUpload$: BehaviorSubject<string> = new BehaviorSubject<string>('');

	private serverUrl: string = 'https://insurance-edi.cfapps.io/ediPlatform';

	constructor(private http: HttpClient) { }

	getLOBs() {
		this.http.get(`${this.serverUrl}/getAllLoBs`).subscribe((res: string[]) => {
			this.lobValues$.next(res);
			this.agencies$.next([]);
			this.templates$.next([]);
			this.versions$.next([]);

		});
	}

	getAgencies(lob: string) {
		this.http.get(`${this.serverUrl}/getAllAgencies?lineOfBusiness=${lob}`).subscribe((res: string[]) => {
			this.agencies$.next(res);
			this.templates$.next([]);
			this.versions$.next([]);

		});

	}

	getTemplates(agency: string) {
		this.http.get(`${this.serverUrl}/getAllTemplates?agencyName=${agency}`).subscribe((res: string[]) => {
			this.templates$.next(res);
			this.versions$.next([]);

		});

	}

	getVersions(template: string) {
		this.http.post(`${this.serverUrl}/getFilesName`, {}, { headers: { 'File-type': 'AL3' } }).subscribe((res: string[]) => {
			res = res.map(x => x.substring(x.lastIndexOf('/') + 1, x.lastIndexOf('.')));
			this.versions$.next(res);
		});

	}

	getDetails({ lob, agency, template, version }) {
		this.http.get(`${this.serverUrl}/getTemplate/${lob}/${agency}/${template}/${version}.json`).subscribe((res: EDI) => {
			this.templateData$.next(res);
		}, (err: any) => {
			this.templateData$.next(undefined);
		});
	}

	saveTemplate(ediObject) {
		this.http.post(`${this.serverUrl}//customizedTemplate`, ediObject).subscribe((res) => {
			//console.log(res);
			var blob = new Blob([JSON.stringify(ediObject)], {type: "text/plain;charset=utf-8"});
			//new File([blob], ediObject.templateName+'.json', {type: "text/json;charset=utf-8"});
			FileSaver.saveAs(blob, ediObject.templateName+'.json');
			this.resetAllValues();
			setTimeout(()=>{
				this.getLOBs();
			},10);
		}, (err: any) => {
			console.error(err);
		});
	}

	uploadFile(file:File){
		let formData = new FormData();
		formData.append('file', file, file.name);
		this.http.post('url',formData, {reportProgress:true, observe:'events'}).subscribe(event => {
			if(event.type === HttpEventType.UploadProgress) {
				this.fileUpload$.next(Math.round(event.loaded/event.total * 100)+"")
			}
		} )
	}

	resetAllValues() {
		this.lobValues$.next([]);
		this.agencies$.next([]);
		this.templates$.next([]);
		this.versions$.next([]);
		this.templateData$.next(undefined);
		this.fileUpload$.next((''));
	}


}
