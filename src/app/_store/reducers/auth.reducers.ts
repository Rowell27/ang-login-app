import { createReducer, on } from '@ngrx/store';
import { User } from './../../_model/user';
import * as AuthActions from './../actions/auth.actions'
 
export interface State {
    user: User;
    errorMessage: string | null;
}

export const initialState: State = {
    user: {
        email: null,
        password: null
    }, 
    errorMessage: null
};

export const reducer = createReducer(
    initialState,

    on(AuthActions.LogInSuccess, (state, action) => {
        return {
            ...state, 
            user: action.user,
            error: null,
        }
    }),
    on(AuthActions.LogInFailure, (state, action) => {
        return {
            ...state,
            user: {
                email: null,
                password: null
            },
            error: action.error,
        }
    })
)