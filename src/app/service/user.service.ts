import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  users: User[] = [];
  user: User;
  usersSubject = new Subject<User[]>();

  constructor() { 
    this.getUsers();
  }

  /**
   * dispatch modifications for all subsribers
   */
  emitUsers() {
    this.usersSubject.next(this.users);
  }

  /**
   * Get all Users
   */
  getUsers() {
    firebase.database().ref('/users')
    .on(
      'value',
      (data) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      } 
    )
  }

  /**
   * Get logged User
   */
  getLoggedUser() {
    const id = firebase.auth().currentUser.uid;
    for (let key of Object.keys(this.users)){
      if(this.users[key].id === id){
        return this.users[key];
      }
    }
    return null;
  }

  /**
   * Get a single User
   * 
   * @param id id of the user
   */
  getUser(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users').orderByChild('id').equalTo(id).limitToFirst(1).once('value', 
          (data) => {
            const results = data.val();
            this.user = results[0];
            resolve(results[0]);
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  /**
   * Create an User and save it to the database
   * @param user User to save
   */
  createNewUser(user: User) {
    this.users.push(user);
    this.saveUsers();
    this.emitUsers();
  }

  /**
   * flush all Users
   * /!\ collection is resetted
   */
  saveUsers() {
    firebase.database().ref('/users').set(this.users);
  }

  /**
   * Add User to the database's collection
   * 
   * @param user 
   */
  addUser(user: User) {
    firebase.database().ref('/users').push(user).once(
      'value',
      (data) => {
        this.users.push(user);
        this.emitUsers();
        
      }
    );
  }

}
