import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { GamesService } from '../../../backend/services/games/games.service'; 
import { PlayersService } from '../../../backend/services/players/players.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Player } from 'src/app/backend/models/Player';

@Component({
  selector: 'app-joingame',
  templateUrl: './joingame.component.html',
  styleUrls: ['./joingame.component.scss']
})
export class JoingameComponent implements OnInit {
  games:Array<any>;
  player:Player;
  joinForm: FormGroup;
  userId:any;
  selectedGame:'';

  constructor(private activatedRoute: ActivatedRoute,
              private _gamesService:GamesService,
              private _playersService: PlayersService,
              public fb:FormBuilder,
              public router: Router)
              {
                this.joinForm = this.fb.group({
                  game:['']
                })
              }

  ngOnInit() {
    this._gamesService.getGames().subscribe(res=>{
      this.games = res;
      console.log("Games in joingame component:"+JSON.stringify(this.games))
    }
    )
    this.activatedRoute.params.subscribe(params=>{
      const userId = params['id'];
      this.userId = userId;
      this._playersService.getPlayer(userId).subscribe(res=>this.player = res);
    })  
  }
  join(){
    this._playersService.join(this.userId).subscribe(res=>{
      this.router.navigate(['']);
    })
    this.router.navigate([''])
  }
  selected(event:any){
    this.selectedGame = event.target.value;
    console.log("Value changed to: "+this.selectedGame);
  }

}
