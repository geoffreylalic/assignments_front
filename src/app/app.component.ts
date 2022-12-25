import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignements.service';

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
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    //  handling errors/messages from different components
    this._assignementService.msg.subscribe((msg) => {
      console.log("msg in app component", msg)
      if (msg.error === undefined) {
        console.log("ici message", msg)
        this.openSnackBar(msg.message, 'mat-primary')
      } else if (msg.message === undefined) {
        console.log("ici error", msg)
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

  handleHome(){
    this.router.navigate([''], { relativeTo: this.route });
  }
  handleAddAssignments(){
    this.router.navigate(['add'], { relativeTo: this.route });
    // this.router.navigate([''], { relativeTo: this.route })
  }
  handleProfile(){

  }
}
