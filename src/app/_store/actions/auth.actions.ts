import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/_model/user';

// export enum AuthActionTypes {
//     LOGIN = '[Auth] Login',
//     LOGIN_SUCCESS = '[Auth] Login Success',
//     LOGIN_FAILURE = '[Auth] Login Failure'
// }

// export class LogIn implements Action {
//     readonly type = AuthActionTypes.LOGIN;
//     constructor(public payload: any) {}
// }

// export class LogInSuccess implements Action {
//     readonly type = AuthActionTypes.LOGIN_SUCCESS;
//     constructor(public payload: any) {}
// }

// export class LogInFailure implements Action {
//     readonly type = AuthActionTypes.LOGIN_FAILURE;
//     constructor(public payload: any) {}
// }

// export type All = 
// | LogIn
// | LogInSuccess
// | LogInFailure;

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';

export const LogIn = createAction(LOGIN, props<{ user: User }> ());
export const LogInSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }> ());
export const LogInFailure = createAction(LOGIN_FAILURE, props<{ error: any }> ());