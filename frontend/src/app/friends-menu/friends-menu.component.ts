import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FriendsService } from './friends.service';
import { Znajomy } from '../app.component';

@Component({
  selector: 'app-friends-menu',
  standalone: true,
  imports: [],
  templateUrl: './friends-menu.component.html',
  styleUrl: './friends-menu.component.css',
})
export class FriendsMenuComponent {
  friends: any[] = []; //lista z znajomymi
    constructor(private friendsService: FriendsService) {
    }
    //ładowanie znajomych
    loadFriends(): void{
      this.friendsService.getFriends().subscribe(
        (data:Znajomy[]) => {
          this.friends = data;
        },
        (error) => {
          console.error("coś nie działa", error);
        }
      );
    }
}
