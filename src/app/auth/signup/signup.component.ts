import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const nom = this.signupForm.get('nom').value;
    const prenom = this.signupForm.get('prenom').value;
    
    this.authService.createNewUser(email, password).then(
      () => {
        const newUser = new User(nom, prenom, firebase.auth().currentUser.uid, firebase.auth().currentUser.email);
        this.userService.addUser(newUser);
        this.userService.getUsers();
        this.router.navigate(['/kiRameneKoi']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}