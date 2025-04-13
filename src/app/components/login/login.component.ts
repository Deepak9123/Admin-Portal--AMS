import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatLibraryModule } from '../../modules/mat-library.module';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatLibraryModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginPageDateTime: any;
  loginData!: FormGroup;
  loginFormSubmitted: boolean = false;
  constructor(
    private router: Router,
    private _cs: CommonService,
    private snackBar: MatSnackBar
  ) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.loginData = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  ngOnInit() {
    const todayDate = new Date();
    const datePart = todayDate.toDateString();
    const timePart = todayDate.toLocaleTimeString();
    this.loginPageDateTime = datePart + ' ' + timePart;
  }

  showError(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['custom-snackbar-error'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, 'Close', config);
  }

  adminCredentials = [
    { email: 'admin1@gmail.com', password: 'pass123' },
    { email: 'admin2@gmail.com', password: 'admin456' },
    { email: 'admin3@gmail.com', password: 'secure789' },
  ];

  async adminLogIn() {
    this.loginFormSubmitted = true;

    if (this.loginData.invalid) {
      return;
    }

    const enteredEmail = this.loginData.value.userId.trim();
    const enteredPassword = this.loginData.value.password;

    const matchedAdmin = this.adminCredentials.find(
      (admin) =>
        admin.email.toLowerCase() === enteredEmail.toLowerCase() &&
        admin.password === enteredPassword
    );

    if (!matchedAdmin) {
      const errorMsg = 'Invalid Email or Password';
      this.showError(errorMsg);
      return;
    }

    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userEmail', enteredEmail);
    this.snackBar.open('Login Successful', 'Close', {
      duration: 2000,
      panelClass: 'snackbar-success',
    });

    setTimeout(() => {
      this.router.navigate(['/enquiryDashboard']);
    }, 1000);
  }
}
