import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './frontend/components/login/login.component';
import { DashboardComponent } from './frontend/components/dashboard/dashboard.component';
import { AuthInterceptor } from './backend/services/auth/authconfig.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {LandingComponent} from './frontend/components/landing/landing.component';
import { HeadingComponent } from './frontend/components/heading/heading.component';
import { JoingameComponent } from './frontend/components/joingame/joingame.component';
import { AddPlayerComponent } from './frontend/components/add-player/add-player.component';
import { UpdatePlayerComponent } from './frontend/components/update-player/update-player.component';
import { GamesComponent } from './frontend/components/games/games.component';
import { SearchPipePipe } from './frontend/pipes/search-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LandingComponent,
    HeadingComponent,
    JoingameComponent,
    AddPlayerComponent,
    UpdatePlayerComponent,
    GamesComponent,
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule.forRoot(),
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
