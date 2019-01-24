import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthStoreService } from '@app/features/auth/store/auth-store.service';
import { CustomValidators } from '@app/shared/validators';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {


  public user: any | null;
  public userForm: FormGroup;
  public loginBtn = true;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: AuthStoreService
  ) {
  }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      email: ['demo@demo.ch', Validators.compose([Validators.required, Validators.email, CustomValidators.email()])],
      password: ['A123456', Validators.compose([Validators.required, Validators.minLength(6), CustomValidators.password()])],
    });
  }

  send(): void {
    if (!this.userForm.valid) {
      // TODO display error
      console.log('form not valid', this.userForm.valid);
      return;
    }
    switch (this.loginBtn) {
      case true:
        this._store.dispatchLoginAction(this.userForm.value);
        break;
      case false:
        this._store.dispatchCreateAction(this.userForm.value);
        break;
      default:
        break;
    }
  }


  inputKeypress($event) {
    if ($event.charCode === 13) {
      this.send();
    }
  }

  toggleBtn(): void {
    this.loginBtn = !this.loginBtn;
  }
}
