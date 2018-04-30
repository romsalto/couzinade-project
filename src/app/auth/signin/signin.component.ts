import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Form initializarion
   */
  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], //valid email
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]] //min 6 char "Alphanumeriques"
    });
  }

  /**
   * Event on form submit
   * Sign in user if credentials are OK and redirect to /KirameneKoi
   */
  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    
    this.authService.signInUser(email, password).then(
      () => {
        
        this.router.navigate(['/kiRameneKoi']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
