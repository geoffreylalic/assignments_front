import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from '../../shared/assignements.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis!: Assignment | undefined;

  constructor(private assingmentsService: AssignmentsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id']
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return
    this.assignmentTransmis.statut = 'true';
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return
    this.assingmentsService.deleteAssignment(this.assignmentTransmis).subscribe(message => {
      console.log('message suppression', message)
      this.assignmentTransmis = undefined
    })
  }
}
