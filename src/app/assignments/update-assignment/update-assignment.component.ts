import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignements.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements OnInit {
  isLoading: boolean = false
  assignment: Assignment = new Assignment()
  errorMessage: string = null
  id: string = null
  statuts = ['à faire', 'en cours', 'terminé']


  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id']
    this.getAssignment()
  }

  getAssignment() {
    this.isLoading = true
    this.assignmentsService.getAssignment(this.id).subscribe((assignment) => {
      console.log("ici ", assignment)
      this.assignment = assignment
      this.isLoading = false
    },
      (error) => {
        console.log("error --- ", error)
        if (error) {
          this.errorMessage = 'Network error'
          console.log("message error", this.errorMessage)
        }
        this.isLoading = true
      })
    console.log("fin")
  }

  onConfirm(){
    this.isLoading = true
    console.log("assiginement to update", this.assignment)
    this.assignmentsService.updateAssignment(this.assignment).subscribe((msg) => {
      console.log("subscribe msg", msg)
    })
    this.isLoading = false
    
    this.router.navigate([''],{relativeTo:this.route})
  }

}
