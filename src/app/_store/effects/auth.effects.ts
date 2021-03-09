import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, concatMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as AuthActions from './../actions/auth.actions'
import { AuthenticateService } from './../../_service/authenticate.service';


@Injectable()
export class AuthEffects {

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LogIn),
            concatMap((action) => 
                this.authenticateService.login(action.user).pipe(
                    map((user) => AuthActions.LogInSuccess({ user: user }) ),
                    catchError((error) => of(AuthActions.LogInFailure({ error })))
                )
            )
        )
    })

    constructor(
        private actions$: Actions,
        private authenticateService: AuthenticateService
    ) { }
}