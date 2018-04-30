import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ItemService {
  private items = [];
  public itemsSubject = new Subject<Item[]>();

  constructor(
    private userService: UserService,
    private db: AngularFireDatabase
  ) { 
    this.getItems();
  }

  /**
   * dispatch modifications for all subsribers
   */
  emitItems() {
    this.itemsSubject.next(this.items);
  }

  /**
   * get all Items
   */
  public getItems() {
    firebase.database().ref('/items')
    .on(
      'value',
      (data) => {
        this.items = data.val() ? data.val() : [];
        for (let key of Object.keys(this.items)){
          this.items[key].id = key;
        }
        this.emitItems();
      } 
    )
  }
  /**
   * Create Item
   * 
   * @param item item to add
   */
  createNewItem(item: Item) {
    this.items.push(item);
    this.saveItems();
    this.emitItems();
  }

  /**
   * flush all items 
   * /!\ collection is resetted
   */
  saveItems() {
    firebase.database().ref('/items').set(this.items);
  }

  /**
   * Add an item to the firebase collection
   * 
   * @param item Item to add
   */
  addItem(item: Item) {
    firebase.database().ref('/items').push(item).once(
      'value',
      (data) => {
        var key = data.key;
        var item = data.val();
        const newItem = new Item(item.name,item.quantity,item.category,item.comments,this.userService.getLoggedUser(), key);
        this.items[key] = newItem;
        this.emitItems();
      }
    );
  }

  /**
   * Delete an Item
   * 
   * @param item Item to delete
   */
  deleteItem(item: Item) {
    const itemRef = this.db.list('items');
    itemRef.remove(item.id);
  }

}
