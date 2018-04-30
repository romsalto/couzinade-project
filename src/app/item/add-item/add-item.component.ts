import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Item } from '../../model/item.model';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize the form
   */
  initForm() {
    this.itemForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        quantity: ['', Validators.required],
        category: ['', Validators.required],
        comments: ['']
      }
    )
  }

  /**
   * Event on submit form
   */
  onSubmitForm() {
    const formValue = this.itemForm.value;
    const newItem = new Item(
      formValue['name'],
      formValue['quantity'],
      formValue['category'],
      formValue['comments'],
      this.userService.getLoggedUser(),
      null
    );
    this.itemService.addItem(newItem);
    //this.itemService.createNewItem(newItem);
    this.router.navigate(['/kiRameneKoi']);
  }

}
