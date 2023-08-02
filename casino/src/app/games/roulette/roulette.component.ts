import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { RouletteGameService } from 'src/app/core/services/roulette-game.service';
import * as numeral from 'numeral';
// interface Cell {
//   number: number;
//   color: string;
//   multiplier: number;
//   type: [string, string],
//   rotate: string;
// }

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})





export class RouletteComponent implements OnInit {

  cells: any = []
  currentRotation: string = '0deg'
  balance = 0
  stake = 0
  screenMessage = 'Place Bet'
  specificNumber = 0
  chosenBet = ''
  multipler = 0
  history = []

  spinning = false


  constructor(private rouletteGameService: RouletteGameService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.cells = this.rouletteGameService.getCells()
    this.balance = this.profileService.getBalance()
    this.history = this.rouletteGameService.getHistory()
  }

  spin() {

    if (this.chosenBet != '' && this.stake != 0 && this.balance >= this.stake && !this.spinning) {
      this.profileService.newGame('roulette')
      this.spinning = true
      this.changeBalance(-this.stake)
      this.displayOnScreen('Spinning...')
      setTimeout(() => {
        this.displayOnScreen('Place Bet')
      }, 3000)

      if (parseInt(this.currentRotation) % 360 == 0) {
        this.currentRotation = '0deg'
      }

      let randomNumber = Math.floor(Math.random() * 8);
      let rotation = randomNumber * 45



      let toRotateRaw = this.evaluateDegrees(parseInt(this.currentRotation), rotation, '+')
      let toRotate = toRotateRaw + 360 * 5
      let number = this.getIndexFromRotation(toRotateRaw)
      setTimeout(() => {
        this.addToHistory(number)
      }, 3000)


      this.currentRotation = `${toRotate}deg`


      // console.log('chosen bet' + this.chosenBet)
      // console.log('this.cells[number].type' + this.cells[number].type.includes('blue'))
      if (number === 8) {
        console.log('JEST ZERPPP')
        if (this.chosenBet === 'specific-number' && this.specificNumber === 0
          || this.chosenBet == 'green') {

          this.displayScreenTimeout('win')

        } else {
          this.displayScreenTimeout('lose')

        }
      }
      else {

        if (this.chosenBet === 'specific-number' && this.specificNumber === number) {
          console.log('You won! by specific')
          this.roundWon(this.stake * this.multipler)
        }
        else if (this.cells[number - 1].type.includes(this.chosenBet)) {
          this.displayScreenTimeout('win')



        } else {
          this.displayScreenTimeout('lose')

        }
      }

      this.chosenBet = ''
    }

    this.profileService.updateMultipler()
  }

  displayScreenTimeout(outcome: string) {
    if (outcome == 'win') {
      setTimeout(() => {
        this.roundWon(this.stake * this.multipler)
      }, 3000)
    }
    else if (outcome == 'lose') {

      setTimeout(() => {
        this.roundLose(this.stake * this.multipler)

      }, 3000)
    }
  }

  getWinningAmount() {
    return this.formatNumber(this.stake * this.multipler)
  }



  addToHistory(index: number) {
    console.log(this.history)
    this.rouletteGameService.addToHistory(7 - index)
    this.history = this.rouletteGameService.getHistory()
    if (this.history.length > 8) {
      console.log('hisotry[0]:  ', this.history[0])
      this.history[0].color = `${this.history[0].color.slice(0, -1)},0.35)`
    }
  }
  roundWon(amount: number) {

    if (this.multipler > 5 && this.stake > this.profileService.getStartingBalance()) {
      this.profileService.missions[2].currentProgress++
    }

    this.changeBalance(amount)
    this.displayOnScreen(`You won $${this.formatNumber(amount)}`)
    this.spinning = false
    this.profileService.gameWon('roulette', amount)
    this.profileService.moneySpend('roulette', this.stake)
  }

  formatNumber(number: number) {
    return numeral(number).format('0[.][000]a').toUpperCase()

  }

  roundLose(amount: number) {

    this.displayOnScreen(`You lost $${this.formatNumber(this.stake)}`)
    this.spinning = false
    this.profileService.moneySpend('roulette', this.stake)
  }

  evaluateDegrees(a: number, b: number, sign: string) {
    if (sign === '+') {
      if (a + b > 360) {
        return a + b - 360
      }
      else {
        return a + b
      }
    }
    else if (sign === '-') {
      if (a - b < 0) {
        return a - b + 360
      }
      else {
        return a - b
      }
    }
    else {
      return 0
    }

  }
  getIndexFromRotation(rotation: number) {
    let index = this.cells.findIndex((cell) => parseInt(cell.rotate) === rotation % 360);

    if (index !== -1) {

      return index + 1;
    } else {
      return 0;
    }
  }


  changeBalance(amount: number) {
    this.profileService.changeBalance(amount)
    this.balance = this.profileService.getBalance()
  }
  increaseStakeSpecial(type: string) {
    if (type == 'half') {
      if (this.stake > 0) {
        this.stake = Math.floor(this.stake / 2)
      }
    }
    else if (type == 'double') {
      if (this.stake * 2 <= this.profileService.getBalance()) {
        this.stake = this.stake * 2
      }
    }
    else if (type == 'max') {
      this.stake = this.profileService.getBalance()
    }
  }
  increaseStake(amount: number) {
    if (this.profileService.getBalance() >= this.stake + amount) {
      this.stake += amount
    }

  }

  resetStake() {
    this.stake = 0
  }

  displayOnScreen(message: string) {
    this.screenMessage = message.toUpperCase()

  }

  chooseBet(value: any) {

    this.chosenBet = value
    if (value !== 'specific-number') {
      this.displayOnScreen(`Bet: ${value}`)
      if (value == 'blue') {
        this.multipler = this.getMultipler('blue')
      }
      else if (value == 'red') {
        this.multipler = this.getMultipler('red')
      }
      else if (value == 'green') {
        this.multipler = this.getMultipler('green')
      }
      else if (value == 'odd') {
        this.multipler = this.getMultipler('odd')
      }
      else if (value == 'even') {
        this.multipler = this.getMultipler('even')
      }
    } else {
      {
        this.multipler = this.getMultipler('specific-number')
        this.displayOnScreen('Bet: ' + this.specificNumber)
      }
    }




  }

  getMultipler(type: string) {
    if (type === 'red') {
      return 2.5
    }
    else if (type === 'blue') {
      return 2
    }
    else if (type === 'green') {
      return 7
    }
    else if (type === 'odd') {
      return 2
    }
    else if (type === 'even') {
      return 2
    }
    else if (type === 'specific-number') {
      return 7
    }
    return 0
  }


}
