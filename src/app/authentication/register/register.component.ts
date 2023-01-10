import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string
  lastName: string
  year: string
  email: string
  password: string

  constructor(private router: Router,
    public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  handleRegister() {
    const user = new User()
    user.name = this.name
    user.lastName = this.lastName
    user.email = this.email
    user.year = this.year
    user.password = this.password
    this.authService.register(user).subscribe(msg => {
      console.log("msg ", msg)
      this.router.navigate(['/signin'], { relativeTo: this.route });
    })
    
  }

}
