import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignements.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis!: Assignment | undefined;
  id:String 

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    console.log("id ", this.id)
    this.getAssignment()
  }

  getAssignment() {
    this.assignmentsService.getAssignment(this.id).subscribe((assignment) => {
      console.log('ici', assignment)
      let a = assignment.find((a) => a.id === this.route.snapshot.params['id'])
      console.log(a)
      this.assignmentTransmis = assignment.find((a) => a.id == this.route.snapshot.params['id'])
      console.log(this.assignmentTransmis)
    })
  }

  onEditAssignment(assignment:Assignment){
    this.router.navigateByUrl(`assignment/${assignment._id}/edit?id=oui`,)
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis?.statut === 'pas commencé' || this.assignmentTransmis?.statut === 'en cours') {
      this.assignmentTransmis.statut = 'terminé'
    }

    // this.router.navigate(['/home']);
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return
    this.assignmentsService.deleteAssignment(this.assignmentTransmis).subscribe(message => {
      console.log('message suppression', message)
      this.assignmentTransmis = undefined
    })
  }
}
