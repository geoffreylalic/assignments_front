import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../shared/auth.service';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  name: string = ""
  lastName: string = ""
  year: string = ""
  email: string = ""
  id: string = ""
  isLoading: boolean = false

  constructor(private authService: AuthService, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = JSON.parse(this.localStorageService.get('auth')).user.id
    let localUser = JSON.parse(this.localStorageService.get("auth"))
    console.log("local user", localUser)
    this.authService.getUser(this.id).subscribe(auth => {
      this.name = auth.name
      this.lastName = auth.lastName
      this.year = auth.year
      this.email = auth.email
      localUser.user = auth
      localUser.user.id = this.id
      // to keep token safe
      this.localStorageService.set("auth", localUser)
    })
  }

  onSubmit() {
    const user = new User()
    user.name = this.name;
    user.lastName = this.lastName;
    user.year = this.year;
    user.email = this.email;

    this.authService.updateUser(this.id, user).subscribe(user => {
      this.authService.msg.next("Successfully modified.")
      this.authService.getLoggedUser.emit(user)
    }, (error) => {
      this.authService.msg.next(error)
    })
    this.router.navigate([''], { relativeTo: this.route })
  }
  handleGoBack() {
    this.router.navigate([''], { relativeTo: this.route })
  }

}
