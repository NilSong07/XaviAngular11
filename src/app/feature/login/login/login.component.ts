import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.redirectUsers();
    }
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.redirectUsers();
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  getEmailErrorMessage(): string {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'Email is required';
    }
    if (this.loginForm.controls['email'].hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'Password is required';
    }
    if (this.loginForm.controls['password'].hasError('minlength')) {
      return 'The minimum of characters will be 8';
    }
    return '';
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

}
