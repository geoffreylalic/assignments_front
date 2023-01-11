import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router,
    public route: ActivatedRoute,
    private authService: AuthService,
    private localStorage: LocalStorageService) { }
  email = ''
  password = ''

  ngOnInit(): void {
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(user => {
      console.log('msg -- ', user)
      this.authService.msg.next('Successfully logged in.')
      this.localStorage.set('auth', user)
      this.authService.getLoggedUser.emit(JSON.parse(this.localStorage.get('auth')))
      console.log(this.localStorage.get('auth'))
      this.router.navigate([''], { relativeTo: this.route });
    }, (error) => {
      console.log("error", error)
      this.authService.msg.next(error)
    })
  }

}
