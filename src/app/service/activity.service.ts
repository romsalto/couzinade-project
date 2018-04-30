import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Activity } from '../model/activity.model';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ActivityService {

  public activities = [];
  public activitiesSubject = new Subject<Activity[]>();

  constructor(
    private db: AngularFireDatabase
  ) { }

  addActivity(activity: Activity) {
    firebase.database().ref('/activities').push(activity).once(
      'value',
      (data) => {
        var key = data.key;
        var activity = data.val();
        const newActivity = new Activity(key, activity.name, activity.link, null)
        this.activities[key] = newActivity;
        this.emitActivities();
      }
    );
  }

  emitActivities() {
    this.activitiesSubject.next(this.activities);
  }

  public getActivities() {
    firebase.database().ref('/activities')
    .on(
      'value',
      (data) => {
        this.activities = data.val() ? data.val() : [];
        for (let key of Object.keys(this.activities)){
          this.activities[key].id = key;
        }
        this.emitActivities();
      } 
    )
  }

  deleteActivity(activiy: Activity) {
    const activityRef = this.db.list('activities');
    activityRef.remove(activiy.id).then(
      () => {
        this.getActivities();
      }
    );
    
  }

  updateActivity(activity: Activity){
    const activityRef = this.db.list('activities');
    activityRef.update(activity.id, activity).then(
      () => {
        this.activities[activity.id] = activity;
        this.emitActivities();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
