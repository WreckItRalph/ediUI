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

	private serverUrl: string = '';
	constructor(private http: HttpClient) {}

	getLOBs() {
		this.http.get(`${this.serverUrl}`).subscribe((res:string[]) => {
			this.lobValues$.next(res);
			this.agencies$.next([]);
			this.templates$.next([]);
			this.versions$.next([]);
		});
	}

	getAgencies(lob: string) {
		this.http.get(`${this.serverUrl}`).subscribe((res:string[]) => {
			this.agencies$.next(res);
			this.templates$.next([]);
			this.versions$.next([]);
		});

	}

	getTemplates(agency: string) {
		this.http.get(`${this.serverUrl}`).subscribe((res:string[]) => {
			this.templates$.next(res);
			this.versions$.next([]);
		});

	}

	getVersions(template: string) {
		this.http.get(`${this.serverUrl}`).subscribe((res:string[]) => {
			this.versions$.next(res);
		});

	}

}
