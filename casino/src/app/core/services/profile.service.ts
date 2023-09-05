import { Injectable } from '@angular/core';
import * as numeral from 'numeral';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  points = 0
  currentMultipler = 1
  multiplerAfterReset = 1
  maxStartingBalance = 5000

  name: string = 'John'
  startingBalance: number = 0
  balance: number = 50000
  gamesPlayed = {
    roulette: 0,
    crazyRun: 0
  }
  moneySpentOnGames = {
    roulette: 0,
    crazyRun: 0
  }
  moneyWonOnGames = {
    roulette: 0,
    crazyRun: 0
  }
  profilePhotos = [
    { src: 'assets/images/profilePhotos/Thomas.png', name: 'Thomas', price: 0, bought: true },
    { src: 'assets/images/profilePhotos/Carmen.png', name: 'Carmen', price: 0, bought: true },
    { src: 'assets/images/profilePhotos/Hugo.png', name: 'Hugo', price: 100, bought: false },
    { src: 'assets/images/profilePhotos/Philips.png', name: 'Philips', price: 250, bought: false },
    { src: 'assets/images/profilePhotos/Michael.png', name: 'Michael', price: 300, bought: false },
    { src: 'assets/images/profilePhotos/Julie.png', name: 'Julie', price: 350, bought: false },
    { src: 'assets/images/profilePhotos/Judy.png', name: 'Judy', price: 400, bought: false },
    { src: 'assets/images/profilePhotos/Pablo.png', name: 'Pablo', price: 500, bought: false },
    { src: 'assets/images/profilePhotos/Paul.png', name: 'Paul', price: 1000, bought: false }

  ]
  selectedProfilePhotoIndex = 0

  missions = [
    { name: 'Play 50 games', reward: 0.05, completed: false },
    { name: 'Double staring balance', reward: 0.5, completed: false },
    { name: '3 times >5', reward: 0.9, completed: false, currentProgress: 0 },
    { name: 'x10 starting balance', reward: 1, completed: false },
    { name: 'Make 10K', reward: 0.1, completed: false },
    { name: 'Make 50K', reward: 0.5, completed: false },
    { name: 'Make 100K', reward: 0.7, completed: false },
    { name: 'Make 500K', reward: 0.8, completed: false },
    { name: 'Make 1M', reward: 1, completed: false },
    { name: 'Make 5M', reward: 1, completed: false },
    { name: 'Make 10M', reward: 1, completed: false },
  ]

  shopItems = [ //JAKOS WYRZUCIC FUNCKJE Z ACTION()???
    {
      type: 'Profile Photo',
      name: 'Hugo',
      price: 50,
      bought: false,
      // action: () => {
      //   this.profilePhotos[2].bought = true;
      // },
      action: { type: 'profilePhoto', index: 2 }
    },
    {
      type: 'Profile Photo',
      name: 'Philips',
      price: 100,
      bought: false,
      // action: () => {
      //   this.profilePhotos[3].bought = true;
      // },
      action: { type: 'profilePhoto', index: 3 }
    },
    {
      type: 'Profile Photo',
      name: 'Michael',
      price: 200,
      bought: false,
      // action: () => {
      //   this.profilePhotos[4].bought = true;
      // },
      action: { type: 'profilePhoto', index: 4 }
    },
    {
      type: 'Profile Photo',
      name: 'Julie',
      price: 250,
      bought: false,
      // action: () => {
      //   this.profilePhotos[5].bought = true;
      // },
      action: { type: 'profilePhoto', index: 5 }
    },
    {
      type: 'Profile Photo',
      name: 'Judy',
      price: 300,
      bought: false,
      // action: () => {
      //   this.profilePhotos[6].bought = true;
      // },
      action: { type: 'profilePhoto', index: 6 }
    },
    {
      type: 'Profile Photo',
      name: 'Pablo',
      price: 500,
      bought: false,
      // action: () => {
      //   this.profilePhotos[7].bought = true;
      // },
      action: { type: 'profilePhoto', index: 7 }
    },
    {
      type: 'Profile Photo',
      name: 'Paul',
      price: 1200,
      bought: false,
      // action: () => {
      //   this.profilePhotos[8].bought = true;
      // },
      action: { type: 'profilePhoto', index: 8 }
    },
    {
      type: 'Multipler',
      name: '+0.1',
      price: 200,
      bought: false,
      // action: () => {
      //   this.currentMultipler += 0.1;
      //   this.multiplerAfterReset += 0.1;
      // },
      action: { type: 'multipler', value: 0.1 }
    },
    {
      type: 'Multipler',
      name: '+0.2',
      price: 600,
      bought: false,
      // action: () => {
      //   this.currentMultipler += 0.2;
      //   this.multiplerAfterReset += 0.2;
      // },
      action: { type: 'multipler', value: 0.2 }
    },
    {
      type: 'Multipler',
      name: '+0.3',
      price: 1000,
      bought: false,
      // action: () => {
      //   this.currentMultipler += 0.3;
      //   this.multiplerAfterReset += 0.3;
      // },
      action: { type: 'multipler', value: 0.3 }
    },
    {
      type: 'Multipler',
      name: '+0.5',
      price: 3000,
      bought: false,
      // action: () => {
      //   this.currentMultipler += 0.5;
      //   this.multiplerAfterReset += 0.5;
      // },
      action: { type: 'multipler', value: 0.5 }
    },
    {
      type: 'Money',
      name: '10K',
      price: 100,
      bought: false,
      // action: () => {
      //   this.balance += 10000;
      // },
      action: { type: 'money', value: 10000 }
    },
    {
      type: 'Money',
      name: '100K',
      price: 2000,
      bought: false,
      // action: () => {
      //   this.balance += 100000;
      // },
      action: { type: 'money', value: 100000 }
    },
    {
      type: 'Money',
      name: '1M',
      price: 18500,
      bought: false,
      // action: () => {
      //   this.balance += 1000000;
      // },
      action: { type: 'money', value: 1000000 }
    },
    {
      type: 'Game',
      name: 'Crazy Run',
      price: 500,
      bought: false,
      action: { type: 'game' }
    },
  ];



  getShopItems() {
    return this.shopItems
  }
  getMaxStartingBalance() {
    return this.maxStartingBalance
  }
  updatePoints() {
    this.points = (Math.floor(((this.getMoneyWon('all') / this.startingBalance)) + (this.getGamesPlayed('all') * 10))) * this.currentMultipler
    return this.points
  }
  updateMultipler() {

    if (this.getGamesPlayed('all') >= 50 && !this.missions[0].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[0].reward
      this.missions[0].completed = true
    }

    if (this.balance >= this.startingBalance * 2 && !this.missions[1].completed && this.missions[0].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[1].reward
      this.missions[1].completed = true
    }
    if (this.missions[2].currentProgress >= 3 && !this.missions[2].completed && this.missions[1].completed && this.missions[0].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[2].reward
      this.missions[2].completed = true
    }
    if (this.balance >= this.startingBalance * 10 && !this.missions[3].completed && this.missions[2].completed && this.missions[1].completed && this.missions[0].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[3].reward
      this.missions[3].completed = true
    }
    if (this.balance >= 10000 && !this.missions[4].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[4].reward
      this.missions[4].completed = true
    }
    if (this.balance >= 50000 && !this.missions[5].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[5].reward
      this.missions[5].completed = true
    }
    if (this.balance >= 100000 && !this.missions[6].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[6].reward
      this.missions[6].completed = true
    }
    if (this.balance >= 500000 && !this.missions[7].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[7].reward
      this.missions[7].completed = true
    }
    if (this.balance >= 1000000 && !this.missions[8].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[8].reward
      this.missions[8].completed = true
    }
    if (this.balance >= 5000000 && !this.missions[9].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[9].reward
      this.missions[9].completed = true
    }
    if (this.balance >= 10000000 && !this.missions[10].completed) {
      this.multiplerAfterReset = this.multiplerAfterReset + this.missions[10].reward
      this.missions[10].completed = true
    }
  }


  // saveData() {
  //   localStorage.setItem('name', JSON.stringify(this.name));
  //   localStorage.setItem('startingBalance', JSON.stringify(this.startingBalance));
  //   localStorage.setItem('balance', JSON.stringify(this.balance));
  //   localStorage.setItem('gamesPlayed', JSON.stringify(this.gamesPlayed));
  //   localStorage.setItem('moneySpentOnGames', JSON.stringify(this.moneySpentOnGames));
  //   localStorage.setItem('moneyWonOnGames', JSON.stringify(this.moneyWonOnGames));
  //   localStorage.setItem('selectedProfilePhotoIndex', JSON.stringify(this.selectedProfilePhotoIndex));

  // }
  // getData() {
  //   this.name = JSON.parse(localStorage.getItem('name')) || 'John';
  //   this.startingBalance = JSON.parse(localStorage.getItem('startingBalance')) || 0;
  //   this.balance = JSON.parse(localStorage.getItem('balance')) || 0;
  //   this.gamesPlayed = JSON.parse(localStorage.getItem('gamesPlayed')) || { roulette: 0, blackjack: 0 };
  //   this.moneySpentOnGames = JSON.parse(localStorage.getItem('moneySpentOnGames')) || { roulette: 0, blackjack: 0 };
  //   this.moneyWonOnGames = JSON.parse(localStorage.getItem('moneyWonOnGames')) || { roulette: 0, blackjack: 0 };
  //   this.selectedProfilePhotoIndex = JSON.parse(localStorage.getItem('selectedProfilePhotoIndex')) || 0;

  // }
  saveData() {
    localStorage.setItem('profileService', JSON.stringify(this));
  }

  getData() {
    if (localStorage.getItem('profileService') !== null) {
      Object.assign(this, JSON.parse(localStorage.getItem('profileService')));
    }

  }



  buyItem(shopItem) {
    console.log(shopItem)
    if (this.updatePoints() >= shopItem.price) {
      shopItem.bought = true
      if (shopItem.action.type === 'profilePhoto') {
        this.profilePhotos[shopItem.action.index].bought = true
      }
      if (shopItem.action.type === 'multipler') {
        this.currentMultipler += shopItem.action.value
        this.multiplerAfterReset += shopItem.action.value
      }
      if (shopItem.action.type === 'money') {
        this.balance += shopItem.action.value
      }
    }
  }

  newGame(type: string) {
    if (type === 'roulette') {
      this.gamesPlayed.roulette++
    }
    else if (type === 'crazyRun') {
      this.gamesPlayed.crazyRun++
    }
    this.saveData()
  }
  gameWon(type: string, winningAmount: number) {
    if (type === 'roulette') {
      this.moneyWonOnGames.roulette += winningAmount
    }
    else if (type === 'crazyRun') {
      this.moneyWonOnGames.crazyRun += winningAmount
    }
    this.updateMultipler()
    this.saveData()
  }
  moneySpend(type: string, lostAmount: number) {
    if (type === 'roulette') {
      this.moneySpentOnGames.roulette += lostAmount
    }
    else if (type === 'crazyRun') {
      this.moneySpentOnGames.crazyRun += lostAmount
    }
    this.saveData()
  }
  getName() {
    return this.name;
  }

  getBalance() {

    return this.balance
  }
  changeBalance(amount: number) {
    this.balance += amount
    this.saveData()
  }

  getProfilePhoto() {
    return this.profilePhotos[this.selectedProfilePhotoIndex]
  }
  getProfilePhotos() {
    return this.profilePhotos
  }
  setProfilePhoto(index: number) {
    this.selectedProfilePhotoIndex = index
    this.saveData()
  }


  getStartingBalance() {
    return this.startingBalance
  }

  setName(name: string) {
    this.name = name
    this.saveData()
  }

  setStartingBalance(startingBalance: number) {
    if (startingBalance > 0 && startingBalance <= 2000000000000) {
      this.startingBalance = startingBalance
      this.balance = startingBalance
      this.saveData()
      return true
    }
    else {
      return false
    }

  }

  getGamesPlayed(game: string) {
    if (game === 'all') {
      let overallGamesPlayed = 0
      overallGamesPlayed = this.gamesPlayed.roulette + this.gamesPlayed.crazyRun
      return overallGamesPlayed
    }
    else if (game === 'roulette') {
      return this.gamesPlayed.roulette
    }
    else if (game === 'crazyRun') {
      return this.gamesPlayed.crazyRun
    }
    else {
      return 0
    }

  }

  getMoneyWon(game: string) {
    if (game === 'all') {
      let overallMoneyWon = 0
      overallMoneyWon = this.moneyWonOnGames.roulette + this.moneyWonOnGames.crazyRun
      return overallMoneyWon
    }
    else if (game === 'roulette') {
      return this.moneyWonOnGames.roulette
    }
    else if (game === 'crazyRun') {
      return this.moneyWonOnGames.crazyRun
    }
    else {
      return 0
    }
  }

  getMoneySpent(game: string) {
    if (game === 'all') {
      let overallMoneySpent = 0
      overallMoneySpent = this.moneySpentOnGames.roulette + this.moneySpentOnGames.crazyRun
      return overallMoneySpent
    }
    else if (game === 'roulette') {
      return this.moneySpentOnGames.roulette
    }
    else if (game === 'crazyRun') {
      return this.moneySpentOnGames.crazyRun
    }
    else {
      return 0
    }
  }

  getProfit(game: string) {
    if (game === 'all') {
      let overallProfit = 0
      overallProfit = this.moneyWonOnGames.roulette + this.moneyWonOnGames.crazyRun - this.moneySpentOnGames.roulette - this.moneySpentOnGames.crazyRun
      return overallProfit
    }
    else if (game === 'roulette') {
      return this.moneyWonOnGames.roulette - this.moneySpentOnGames.roulette
    }
    else if (game === 'crazyRun') {
      return this.moneyWonOnGames.crazyRun - this.moneySpentOnGames.crazyRun
    }
    else {
      return 0
    }
  }


  // missions = [
  //   { name: 'Play 50 games', reward: 0.05, completed: false },
  //   { name: 'Do




  resetGame() {
    this.name = 'John'
    this.selectedProfilePhotoIndex = 0
    this.balance = 0
    this.startingBalance = 0
    this.gamesPlayed = {
      roulette: 0,
      crazyRun: 0
    }
    this.moneySpentOnGames = {
      roulette: 0,
      crazyRun: 0
    }
    this.moneyWonOnGames = {
      roulette: 0,
      crazyRun: 0
    }

    this.currentMultipler = this.multiplerAfterReset
    this.missions.forEach(m => {
      m.completed = false
    })


    this.saveData()
    this.getData()

  }


  constructor() {
    //this.saveData()
    this.getData()
  }

}
