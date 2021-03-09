import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticateService {

	constructor() { }

	subjectObservable: Subject<any> = new Subject();

	login(authData: User): Observable<any> {
		if (authData) {
			this.subjectObservable.next(authData);
			return this.subjectObservable;
		}
	}
}
