import { Component } from '@angular/core';
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
    idGracz: number = 5;
  
    constructor(private friendsService: FriendsService) {}
    ngOnInit(): void {
      //this.loadFriends();
    }
  
    //ładowanie znajomych
    loadFriends(): void{
      this.friendsService.getFriends(this.idGracz).subscribe(
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
