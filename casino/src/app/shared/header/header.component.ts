import { Component } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

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
    return this.profileService.getBalance();
  }
}
