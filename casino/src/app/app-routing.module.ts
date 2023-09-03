import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesComponent } from './games/games.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './shared/home/home.component';
import { RouletteComponent } from './games/roulette/roulette.component';
import { BlackjackComponent } from './games/blackjack/blackjack.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'games', component: GamesComponent, children: [
      { path: 'roulette', component: RouletteComponent },
      { path: 'crazy-run', component: BlackjackComponent }
    ]
  },
  { path: 'profile', component: ProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
