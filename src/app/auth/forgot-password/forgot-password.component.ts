import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  isResetEmailSend: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmitClick() {
    this.authService.resetPassword(this.email).then(
      () => {
        this.isResetEmailSend = true;
      },
      (error) => {
        this.isResetEmailSend = false;
        this.errorMessage = error;
      }
    )
  }

}
