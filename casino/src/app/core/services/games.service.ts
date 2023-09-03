import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games = [
    { name: 'Roulette', description: 'Classic roulette game. Try your luck!', stakes: '1-no limit', image: 'assets/images/roulette.png', route: 'roulette' },
    { name: 'Crazy Run', description: 'Coming soon...', stakes: '1-5000', image: 'assets/images/blackjack.png', route: 'crazy-run' },
  ]



  constructor() { }


  getGames() {
    return this.games;
  }
}
