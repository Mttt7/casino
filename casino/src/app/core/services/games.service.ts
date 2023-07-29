import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games = [
    { name: 'Roulette', description: 'roulette game you can win or lose hhhhhhh its easy an fun ', stakes: '1-5000', image: 'assets/images/roulette.png', route: 'roulette' },
    { name: 'Blackjack', description: 'blackjack game you can win or lose hhhhhhh its easy an fun', stakes: '1-5000', image: 'assets/images/blackjack.png', route: 'blackjack' },
  ]



  constructor() { }


  getGames() {
    return this.games;
  }
}
