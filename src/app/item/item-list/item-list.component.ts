import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { ItemService } from '../../service/item.service';
import { Categories } from '../../model/categories.model';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  categories: Categories;

  items: Item[] = [];

  itemSubscription: Subscription;

  constructor(
    private itemService: ItemService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.itemSubscription = this.itemService.itemsSubject.subscribe(
      (items: Item[]) => {
        this.items = items;
        this.categoryfyItems();
      } 
    )
    this.itemService.getItems();
    this.itemService.emitItems();
  }

  /**
   * Categorise items into a Categories object
   */
  categoryfyItems() {
    this.categories = new Categories();
    for (let key of Object.keys(this.items)){
      var item = this.items[key];
      switch(item.category){
        case 'Soft':
          this.categories.Soft.push(item);
          break;
        case 'Alcool':
          this.categories.Alcool.push(item);
          break;
        case 'Nourriture':
          this.categories.Nourriture.push(item);
          break;
        case 'Intendance':
          this.categories.Intendance.push(item);
          break;
        case 'Matériel':
          this.categories.Materiel.push(item);
          break;
        default:
          this.categories.Autre.push(item);
          break;
      }
    }
  }

  /**
   * Event on delete button click
   * 
   * @param item 
   */
  onDelBtnClick(item: Item) {
    const connectedUser = this.userService.getLoggedUser();
    //check if the user is the owner
    if (item.user.id === connectedUser.id){
      this.itemService.deleteItem(item);
    }
  }

  /**
   * Checks if the logged User is the owner of the Item
   * 
   * @param item
   */
  isLoggedUserOwner(item: Item){
    document.getElementById('map');
    if(item.user.id == this.userService.getLoggedUser().id){
      return false;
    }else{
      return true;
    }
  }


  
}
