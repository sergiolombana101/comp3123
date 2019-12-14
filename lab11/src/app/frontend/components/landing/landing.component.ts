import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../../backend/services/players/players.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  players:Array<any>;
  constructor(private _playersService : PlayersService) {
    this._playersService.getPlayers().subscribe(res=>this.players = res);
   }

  ngOnInit() {
  }

}
