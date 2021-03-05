import { Injectable } from '@angular/core';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  login(authData: User, success: any, error: any) {
    if (authData) success(authData);
    else error();
  }
}
