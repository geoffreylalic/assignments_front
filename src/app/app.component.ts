import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignements.service';
import { AuthService } from './shared/auth.service';
import { LocalStorageService } from './shared/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assignments Tracker';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private _assignementService: AssignmentsService, private router: Router,
    public route: ActivatedRoute, private authService: AuthService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    //  handling errors/messages from different components
    this._assignementService.msg.subscribe((msg) => {
      if (msg.ok === undefined) {
        this.openSnackBar(msg.message, 'mat-primary')
      } else if (!msg.ok) {
        this.openSnackBar(msg, 'mat-warn')
      }
    })
    this.authService.msg.subscribe((msg) => {
      if (msg.ok === false) {
        this.openSnackBar(msg.error, 'mat-warn')
      }
    })
  }

  openSnackBar(msg, className) {
    this._snackBar.open(msg, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: ['mat-toolbar', className]
    });
  }

  handleHome() {
    this.router.navigate([''], { relativeTo: this.route });
  }
  handleAddAssignments() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
  handleProfile() {

  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.localStorage.remove('auth')
      this.router.navigate(['/signin'], { relativeTo: this.route });
    }, (error) => {
      this.authService.msg.next(error)
    })
  }
}
