import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './frontend/components/login/login.component';
import { DashboardComponent } from './frontend/components/dashboard/dashboard.component';
import { LandingComponent } from './frontend/components/landing/landing.component';
import { JoingameComponent } from './frontend/components/joingame/joingame.component';

import { AuthGuard } from './backend/guard/auth.guard';
import { AddPlayerComponent } from './frontend/components/add-player/add-player.component';
import { UpdatePlayerComponent } from './frontend/components/update-player/update-player.component';
import { GamesComponent } from './frontend/components/games/games.component';


const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'login', component:LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'join/:id', component:JoingameComponent, pathMatch:'full'},
  {path: 'dashboard/update/:id', component:UpdatePlayerComponent, pathMatch:'full'},
  {path: 'dashboard/addPlayer', component:AddPlayerComponent},
  {path: 'dashboard/addPlayer/back', redirectTo:'dashboard'},
  {path: 'dashboard/games', component:GamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
