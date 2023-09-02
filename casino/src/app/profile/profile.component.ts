import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../core/services/profile.service';
import { GamesService } from '../core/services/games.service';
import { Router } from '@angular/router';
import * as numeral from 'numeral';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profilePhotoSrc: string = ''
  name: string = ''
  games: any = []
  moneyWonOnGames: any = []

  hover = false
  profilePhotoHover = false
  changePhotoModal = false
  changeNameModal = false
  infoClicked = false
  shopOpened = false

  shopItems = []

  photos: any = []

  newStartingBalance = 0

  newName = ''

  constructor(private profileService: ProfileService,
    private gameService: GamesService,
    private router: Router) { }


  ngOnInit(): void {
    this.games = this.gameService.getGames()
    this.profilePhotoSrc = this.profileService.getProfilePhoto().src
    this.name = this.profileService.getName()
    this.photos = this.profileService.getProfilePhotos()
    this.shopItems = this.profileService.getShopItems()

  }
  buyItem(shopItem) {

  }

  getPriceOfPhoto(i) {
    if (this.photos[i].price === 0 || this.photos[i].bought) {
      return ''
    }
    return `P${this.photos[i].price}`
  }


  isPhotoLocked(index: number) {

    let profilePhoto = this.profileService.getProfilePhotos()[index]
    return profilePhoto.bought ? false : true
  }
  toogleShopOpened() {
    this.shopOpened = !this.shopOpened
  }
  getCurrentMutipler() {
    return Math.floor(this.profileService.currentMultipler * 100) / 100
  }
  getMultiplerAfterReset() {
    return Math.floor(this.profileService.multiplerAfterReset * 100) / 100
  }
  updatePoints() {
    return this.profileService.updatePoints()
  }
  toogleInfoClicked() {
    this.infoClicked = !this.infoClicked
  }
  applyNewUser() {
    if (this.newStartingBalance > 0) {
      this.profileService.setStartingBalance(this.newStartingBalance)
    }
  }
  sliderChanged(event: any) {
    console.log(this.newStartingBalance)
  }

  getFormatedBalance() {
    return this.formatNumber(this.profileService.getBalance())
  }

  formatNumber(number: number) {
    return numeral(number).format('0[.][000]a').toUpperCase()

  }

  getMoneyWonOnGame(game: string) {
    return this.formatNumber(this.profileService.getMoneyWon(game))
  }
  getMoneySpentOnGame(game: string) {
    return this.formatNumber(this.profileService.getMoneySpent(game))
  }
  getProfit(game: string) {
    let profit = this.profileService.getProfit(game)
    if (profit >= 0) {
      return this.formatNumber(this.profileService.getProfit(game))
    }
    else if (profit < 0) {
      return `-$${this.formatNumber(Math.abs(this.profileService.getProfit(game)))}`
    }
    else {
      return 0
    }
  }
  getGamesPlayed(game: string) {
    return this.profileService.getGamesPlayed(game)
  }
  getBalance() {
    return this.formatNumber(this.profileService.getBalance())
  }
  getStartingBalance() {
    return this.formatNumber(this.profileService.getStartingBalance())
  }

  openModalChangeProfilePhoto() {
    this.changePhotoModal = true
  }
  changeProfilePhoto(index: number) {
    let profilePhoto = this.profileService.getProfilePhotos()[index]
    this.profilePhotoSrc = profilePhoto.src
    console.log(profilePhoto)
    if (profilePhoto.bought) {
      this.profileService.setProfilePhoto(index)
      this.changePhotoModal = false
    }


  }
  openModalChangeName() {
    this.changeNameModal = true
  }
  changeName() {
    this.profileService.setName(this.newName)
    this.changeNameModal = false
    this.name = this.newName
  }
  getMaxStartingBalance() {
    return this.profileService.getMaxStartingBalance()
  }

  resetGame() {
    this.profileService.resetGame()
    this.ngOnInit()
  }
}
