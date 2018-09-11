import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginData } from '../../shared/models/login-data.model';
import { ValidationService } from '../../core/services/validation.service';

@Component({
  selector: 'pms-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  email = new FormControl('', [Validators.required, ValidationService.emailValidator]);
  password = new FormControl('', [ Validators.required, ValidationService.passwordValidator]);
  loginForm: FormGroup;
  loginErrorMessage: string;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authService: AuthService,
                //private growler: GrowlerService,
                //private logger: LoggerService
                ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.loginForm = this.formBuilder.group({
            email:  this.email,
            password: this.password
        });
    }

    submit({ value, valid }: { value: LoginData, valid: boolean }) {
        this.authService.login(value)
            .subscribe((success: boolean) => {
                if (success) {
                    //this.growler.growl('Logged in', GrowlerMessageType.Info);
                    if (this.authService.redirectUrl) {
                        const redirectUrl = this.authService.redirectUrl;
                        this.authService.redirectUrl = '';
                        this.router.navigate([redirectUrl]);
                    } else {
                        this.router.navigate(['/cars']);
                    }
                } else {
                    const loginError = 'Unable to login, please check your e-mail and password';
                    this.loginErrorMessage = loginError;
                    //this.growler.growl(loginError, GrowlerMessageType.Danger);
                }
            },
            (err: any) => {
              console.log(err);
            //  this.logger.log(err);
            });
    }
}