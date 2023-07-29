import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  name: string = 'John'
  startingBalance: number = 0
  balance: number = 50000
  gamesPlayed = {
    roulette: 40,
    blackjack: 23
  }
  moneySpentOnGames = {
    roulette: 5970,
    blackjack: 1920
  }
  moneyWonOnGames = {
    roulette: 450,
    blackjack: 253230
  }
  profilePhotos = [
    { src: 'assets/images/profilePhotos/Thomas.png', name: 'Thomas' },
    { src: 'assets/images/profilePhotos/Carmen.png', name: 'Carmen' },
    { src: 'assets/images/profilePhotos/Hugo.png', name: 'Hugo' },
    { src: 'assets/images/profilePhotos/Judy.png', name: 'Judy' },
    { src: 'assets/images/profilePhotos/Julie.png', name: 'Julie' },
    { src: 'assets/images/profilePhotos/Michael.png', name: 'Michael' },
    { src: 'assets/images/profilePhotos/Pablo.png', name: 'Pablo' },
    { src: 'assets/images/profilePhotos/Paul.png', name: 'Paul' },
    { src: 'assets/images/profilePhotos/Philips.png', name: 'Philips' },

  ]
  selectedProfilePhotoIndex = 0


  constructor() { }

  getName() {
    return this.name;
  }

  getBalance() {
    return this.balance;
  }

  getProfilePhoto() {
    return this.profilePhotos[this.selectedProfilePhotoIndex]
  }
  getProfilePhotos() {
    return this.profilePhotos
  }
  setProfilePhoto(index: number) {
    this.selectedProfilePhotoIndex = index
  }

  getStartingBalance() {
    return this.startingBalance;
  }

  setName(name: string) {
    this.name = name
  }

  setStartingBalance(startingBalance: number) {
    if (this.startingBalance === 0 && startingBalance > 0 && startingBalance <= 20000) {
      this.startingBalance = startingBalance
      return this.startingBalance
    }
    else {
      return 0
    }
  }

  getGamesPlayed(game: string) {
    if (game === 'all') {
      let overallGamesPlayed = 0
      overallGamesPlayed = this.gamesPlayed.roulette + this.gamesPlayed.blackjack
      return overallGamesPlayed
    }
    else if (game === 'roulette') {
      return this.gamesPlayed.roulette
    }
    else if (game === 'blackjack') {
      return this.gamesPlayed.blackjack
    }
    else {
      return 0
    }

  }

  getMoneyWon(game: string) {
    if (game === 'all') {
      let overallMoneyWon = 0
      overallMoneyWon = this.moneyWonOnGames.roulette + this.moneyWonOnGames.blackjack
      return overallMoneyWon
    }
    else if (game === 'roulette') {
      return this.moneyWonOnGames.roulette
    }
    else if (game === 'blackjack') {
      return this.moneyWonOnGames.blackjack
    }
    else {
      return 0
    }
  }

  getMoneySpent(game: string) {
    if (game === 'all') {
      let overallMoneySpent = 0
      overallMoneySpent = this.moneySpentOnGames.roulette + this.moneySpentOnGames.blackjack
      return overallMoneySpent
    }
    else if (game === 'roulette') {
      return this.moneySpentOnGames.roulette
    }
    else if (game === 'blackjack') {
      return this.moneySpentOnGames.blackjack
    }
    else {
      return 0
    }
  }

  getProfit(game: string) {
    if (game === 'all') {
      let overallProfit = 0
      overallProfit = this.moneyWonOnGames.roulette + this.moneyWonOnGames.blackjack - this.moneySpentOnGames.roulette - this.moneySpentOnGames.blackjack
      return overallProfit
    }
    else if (game === 'roulette') {
      return this.moneyWonOnGames.roulette - this.moneySpentOnGames.roulette
    }
    else if (game === 'blackjack') {
      return this.moneyWonOnGames.blackjack - this.moneySpentOnGames.blackjack
    }
    else {
      return 0
    }
  }



  resetGame() {
    this.name = 'John'
    this.selectedProfilePhotoIndex = 0
    this.balance = 0
    this.startingBalance = 0
    this.gamesPlayed = {
      roulette: 0,
      blackjack: 0
    }
    this.moneySpentOnGames = {
      roulette: 0,
      blackjack: 0
    }
    this.moneyWonOnGames = {
      roulette: 0,
      blackjack: 0
    }
  }


}
