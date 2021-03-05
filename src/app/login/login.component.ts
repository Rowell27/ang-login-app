import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../_model/user';
import { AuthenticateService } from '../_service/authenticate.service';

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
  
  constructor( private formBuilder: FormBuilder, private authenticateService: AuthenticateService) { }

  ngOnInit(): void {
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
  
  onSubmitForm() {
    this.message = "";
    this.loginFormGrp.markAllAsTouched();
    if (this.loginFormGrp.invalid) return;
    
    let userData: User = {
      "email" : this.form.email.value,
      "password" : this.form.password.value
    }

    this.authenticateService.login(userData, 
      success => {
        this.message = "Account "+ success['email'] + " logged in successfully.";
        this.messageType = "success";
      }, error => {
        this.message = "Invalid email or password."
        this.messageType = "error";
    })
  }
}
