import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../_model/user';
import { AppState } from '../_store/app.states';
import * as fromAuthActions from './../_store/actions/auth.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginFormGrp: FormGroup;
	loader: boolean = false;
	message: string = "";
	messageType: string;
	private unsubscribe$ = new Subject<void>();

	constructor(
		private formBuilder: FormBuilder,
		private store: Store<AppState>,
		private actions$: Actions
	) { }

	ngOnInit(): void {
		this.loginActionSubject();
		this.validateLoginForm();
	}

	get form() {
		return this.loginFormGrp.controls;
	}

	validateLoginForm() {
		this.loginFormGrp = this.formBuilder.group({
			email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
			password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
		});
	}

	onSubmitForm(): void {
		this.message = "";
		this.loginFormGrp.markAllAsTouched();
		if (this.loginFormGrp.invalid) return;

		const user: User = {
			"email": this.form.email.value,
			"password": this.form.password.value
		}
		this.store.dispatch(fromAuthActions.LogIn({ user }));
	}

	loginActionSubject() {
		this.actions$
		.pipe(
			ofType(fromAuthActions.LogIn),
			takeUntil(this.unsubscribe$))
		.subscribe(data => {
			this.message = "Account " + data.user['email'] + " logged in successfully.";
			this.messageType = "success";
		}, error => {
			this.message = "Invalid email or password."
			this.messageType = "error";
		})
	}
}
