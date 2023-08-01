import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouletteGameService {

  blue = 'rgb(5, 120, 189)'
  red = 'rgb(230, 70, 70)'
  green = 'rgb(28, 187, 28)'

  history = []

  cells = [
    //usunac multipler ale sprawdzic czy napewno nie sa nigdzie uzywane!!!!
    { number: 0, color: this.green, multiplier: 15, type: ['green', 'even'], rotate: '0deg' },
    { number: 1, color: this.blue, multiplier: 2.65, type: ['blue', 'odd'], rotate: '45deg' },
    { number: 2, color: this.red, multiplier: 1.65, type: ['red', 'even'], rotate: '90deg' },
    { number: 3, color: this.blue, multiplier: 2.65, type: ['blue', 'odd'], rotate: '135deg' },
    { number: 4, color: this.red, multiplier: 1.65, type: ['red', 'even'], rotate: '180deg' },
    { number: 5, color: this.blue, multiplier: 2.65, type: ['blue', 'odd'], rotate: '225deg' },
    { number: 6, color: this.red, multiplier: 1.65, type: ['red', 'even'], rotate: '270deg' },
    { number: 7, color: this.blue, multiplier: 2.65, type: ['blue', 'odd'], rotate: '315deg' },

  ].reverse()


  constructor() { }



  getCells() {
    return this.cells
  }
  getHistory() {
    return this.history.slice()
  }
  addToHistory(index: number) {
    let copiedCell: any;
    if (index === -1) {
      copiedCell = JSON.parse(JSON.stringify(this.cells[7]));
    } else {
      copiedCell = JSON.parse(JSON.stringify(this.cells[index]));
    }
    this.history.push(copiedCell);
    if (this.history.length > 9) {
      this.history.shift();
    }
  }
}
