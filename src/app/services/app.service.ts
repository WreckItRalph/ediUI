import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	public lobValues$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	public agencies$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);;
	public templates$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);;
	public versions$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);;
	public details$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);;

	private serverUrl: string = 'https://insurance-edi.cfapps.io/ediPlatform';
	
	constructor(private http: HttpClient) {}

	getLOBs() {
		this.http.get(`${this.serverUrl}/getAllLoBs`).subscribe((res:string[]) => {
			this.lobValues$.next(res);
			this.agencies$.next([]);
			this.templates$.next([]);
			this.versions$.next([]);
			
		});
	}

	getAgencies(lob: string) {
		this.http.get(`${this.serverUrl}/getAllAgencies`).subscribe((res:string[]) => {
			this.agencies$.next(res);
			this.templates$.next([]);
			this.versions$.next([]);
			
		});

	}

	getTemplates(agency: string) {
		this.http.get(`${this.serverUrl}/getAllTemplates`).subscribe((res:string[]) => {
			this.templates$.next(res);
			this.versions$.next([]);
			
		});

	}

	getVersions(template: string) {
		this.http.post(`${this.serverUrl}/getFilesName`,{}, {headers:{'File-type':'AL3'}}).subscribe((res:string[]) => {
			res = res.map(x => x.substring(x.lastIndexOf('/')+1, x.lastIndexOf('.')));
			this.versions$.next(res);
		});

	}

	getDetails(s:any){
		this.http.get(`${this.serverUrl}`).subscribe((res:string[]) => {
			this.details$.next(res);
		});
	}

}
