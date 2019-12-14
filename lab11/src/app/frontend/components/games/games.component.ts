import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/backend/services/games/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games:Array<any>

  constructor(private _gamesService:GamesService) { }

  ngOnInit() {

    this._gamesService.getGames().subscribe(res=>{
      this.games = res;
    }
    )
  }

}
