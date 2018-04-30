import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from '../../model/activity.model';
import { ActivityService } from '../../service/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  activityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.activityForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        link: ['']
      }
    )
  }

  onSubmitForm() {
    const formValue = this.activityForm.value;
    const newActivity = new Activity(
      null,
      formValue['name'],
      formValue['link'],
      null
    );
    this.activityService.addActivity(newActivity);
    this.router.navigate(['/activities']);
  }

}
