import { Component, OnInit } from '@angular/core';
import { GamesService } from '../core/services/games.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: any = [];
  gameSelected = false

  constructor(private gameService: GamesService,
    private router: Router) { }





  ngOnInit(): void {
    this.gameSelected = false
    this.games = this.gameService.getGames();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.gameSelected = event.urlAfterRedirects !== '/games';
      }
    });
  }
}

