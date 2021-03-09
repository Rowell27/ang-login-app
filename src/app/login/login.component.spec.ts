import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate form to be valid', async(() => {
    const form = component.loginFormGrp.controls;
    form.email.setValue('dummy@test.com');
    form.password.setValue('dummy123');
    expect(component.loginFormGrp.valid).toBeTruthy();
  }));

  it('should validate form to be invalid', async(() => {
    const form = component.loginFormGrp.controls;
    form.email.setValue('');
    form.password.setValue('');
    expect(component.loginFormGrp.valid).toBeFalsy();
  }));

  it('should authenticate login on submit', async(() => {
    const form = component.loginFormGrp.controls;
    form.email.setValue('dummy@test.com');
    form.password.setValue('dummy123');
    spyOn(component, 'onSubmitForm');
    fixture.nativeElement.querySelector('button').click();
    expect(component.onSubmitForm).toHaveBeenCalled();
  }));

  it('should validate email to be invalid', async(() => {
    const form = component.loginFormGrp.controls;
    form.email.setValue('dummytest.com');
    form.password.setValue('dummy123');
    expect(component.loginFormGrp.valid).toBeFalsy();
  }));

  it('should validate pass to be invalid', async(() => {
    const form = component.loginFormGrp.controls;
    form.email.setValue('dummy@test.com');
    form.password.setValue('a');
    expect(component.loginFormGrp.valid).toBeFalsy();
  }));
});
