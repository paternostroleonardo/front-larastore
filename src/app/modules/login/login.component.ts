import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core/services/token.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Session } from '@app/shared/interfaces/session.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public response: Session;
  private form: FormGroup;
  msg = '';
  public error = null;
  public dataid: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private Token: TokenService,
    private Permission: PermissionService,
  ) {}

  async logIn() {
    await this.authService
      .loginUN(this.form.value.username, this.form.value.password)
      .then((data: any) => {
        if (data['acceso'] == true) {

          this.route.navigate(['/dashboard']);
          // window.location.reload();
        } else {
          this.msg = 'Usuario o contraseña inválidos.';
          //       console.log('Error: ' + err);
        }
      });
  }

  // Refresh token inicialization session + permission
  Refresh(response) {
    this.Token.handle(response.access_token);
    this.Permission.changePermissionStatus(true);
    this.route.navigateByUrl('/products');
  }

  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: [''],
    });
  }

  getUserName(searchValue: string): void {
    sessionStorage.setItem('username', searchValue);
    sessionStorage.getItem('username');
    // console.log(searchValue);
  }

  get getFormGroup() {
    return this.form;
  }
}