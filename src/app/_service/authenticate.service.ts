import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  login(email: string, password: string) {
    if (email && password) {
      return alert("Login Success! Welcome "+email);
    }
  }
}
