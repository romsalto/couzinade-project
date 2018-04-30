import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  title: string = 'La ferme des Prairies';
  lat: number = 48.261505;
  lng: number = 4.239973;
  link: string = "https://www.grandsgites.com/gite-10-ferme-prairies-1763.htm";

  constructor() { }

  ngOnInit() {
  }

}
