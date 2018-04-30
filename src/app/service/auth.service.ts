import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) { 
    this.userService.getUsers();
  }

  /**
   * Method for resetting password
   * 
   * @param email user's email for resetting pwd
   */
  resetPassword(email: string) {
    var auth = firebase.auth();
  
    return auth.sendPasswordResetEmail(email)
      .then(
        () => {
          console.log("email sent");
        }
      )
      .catch(
        (error) => console.log(error)
      );
  }

  /**
   * Create a new User using firebase.auth() method
   * 
   * @param email users's email
   * @param password users's password
   */
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  /**
   * Sign in
   * 
   * @param email user's email
   * @param password user's password
   */
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  } 

  /**
   * Sign out
   */
  signOutUser() {
    firebase.auth().signOut();
  }

}
