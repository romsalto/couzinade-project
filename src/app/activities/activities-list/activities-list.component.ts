import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../service/activity.service';
import { Activity } from '../../model/activity.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../service/user.service';
import { User } from 'firebase';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

  activities: Activity[] = [];
  activitySubscription: Subscription;
  closeResult: string;
  toRemoveActivity: Activity;

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.activitySubscription = this.activityService.activitiesSubject.subscribe(
      (activities: Activity[]) => {
        if(activities.length === undefined || activities.length === 0) {
          this.activities = [];
          for (let key of Object.keys(activities)) {
            this.activities.push(activities[key]);
          }
        }
      } 
    )
    this.activityService.getActivities();
    this.activityService.emitActivities();
  }

  onParticipateClick(activity: Activity) {
    const updatedActivity = this.activityService.activities[activity.id];
    if(updatedActivity.users === undefined) {
      updatedActivity.users = [];
    }
    updatedActivity.users.push(this.userService.getLoggedUser());
    this.activityService.updateActivity(updatedActivity);
  }

  onNotParticipateClick(activity: Activity) {
    const updatedActivity = this.activityService.activities[activity.id];
    var newUsers: User[] = [];
    for(let user of updatedActivity.users){
      if(user.id !== this.userService.getLoggedUser().id) {
        newUsers.push(user);
      }
    }
    updatedActivity.users = newUsers;
    this.activityService.updateActivity(updatedActivity);
  }

  isAlreadyParticipating(activity: Activity) {
    if(activity.users === undefined) {
      return false;
    }
    for (let user of activity.users) {
      if(user.id === this.userService.getLoggedUser().id) {
        return true;
      }
    }
    return false;
  }


  open(content, activity) {
    this.toRemoveActivity = activity;
    this.modalService.open(content).result.then(
      (result) => {
        if(result === 'remove activity'){
          this.remove(this.toRemoveActivity);
        }
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  remove(activity: Activity) {
    this.activityService.deleteActivity(activity);
    this.toRemoveActivity = undefined;
  }
}
