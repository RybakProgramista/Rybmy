import { Component, Output, EventEmitter } from '@angular/core';
import { FriendsService } from './friends.service';

@Component({
  selector: 'app-friends-menu',
  standalone: true,
  imports: [],
  templateUrl: './friends-menu.component.html',
  styleUrl: './friends-menu.component.css',
})
export class FriendsMenuComponent {
  friends: any[] = []; //lista z znajomymi
    _idGracz: number = -1;
    @Output() sendID = new EventEmitter<number>(); 
    constructor(private friendsService: FriendsService) {
      this.sendID.subscribe(id => {
        this._idGracz = id;
        this.loadFriends();
      })
    }
  
    //ładowanie znajomych
    loadFriends(): void{
      this.friendsService.getFriends(this._idGracz).subscribe(
        (data) => {
          this.friends = data;  // przypisanie znajomych
          console.log(data);
        },
        (error) => {
          console.error("coś nie działa", error);
        }
      );
    }
}
