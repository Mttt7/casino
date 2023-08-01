import { Component } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import * as numeral from 'numeral';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {





  constructor(
    private profileService: ProfileService
  ) {

  }


  getBalance() {
    return numeral(this.profileService.getBalance()).format('0a');
  }
}
