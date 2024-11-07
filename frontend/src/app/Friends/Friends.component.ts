import { Component, OnInit} from '@angular/core';
import { FriendsService } from './friends.service';

@Component({
  selector: 'app-Friends',
  standalone: true,
  imports: [],
  templateUrl: './Friends.component.html',
  styleUrl: './Friends.component.css'
})

export class FriendsComponent implements OnInit{
  friends: any[] = []; //lista z znajomymi
  idGracz: number = 1;

  constructor(private friendsService: FriendsService) {}
  ngOnInit(): void {
    this.loadFriends();
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
