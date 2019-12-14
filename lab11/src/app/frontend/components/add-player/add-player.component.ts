import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../../backend/services/games/games.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Player } from 'src/app/backend/models/Player';
import { PlayersService } from 'src/app/backend/services/players/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  games:Array<any>
  addPlayerForm: FormGroup;
  selectedGame:'';
  selectedStatus:'';
  selectedRank:'';
  error: any;
  player:Player;
  response:any;

  constructor(private _gamesService:GamesService,public fb:FormBuilder, private _playerService:PlayersService, private router:Router) { 
    this.addPlayerForm = this.fb.group({
      pname:[''],
      rankDrop:[''],
      pscore:[''],
      ptime:[''],
      statusDrop:[''],
      gDrop:['']
    })
  }

  ngOnInit() {
    this._gamesService.getGames().subscribe(res=>{
      this.games = res;
    }
    )
  }
  selectedR(event:any){
    this.selectedRank = event.target.value.substring(3);
  }
  selectedG(event:any){
    this.selectedGame = event.target.value.substring(3);
  }
  selectedS(event:any){
    console.log("Before selected status: "+event.value);
    this.selectedStatus = event.target.value;
    console.log("Selected status: "+this.selectedStatus)
  }
  add(){
    if(this.addPlayerForm.value.pname == ""||this.selectedRank==""||
       this.addPlayerForm.value.pscore == ""||this.selectedGame==""||
       this.addPlayerForm.value.ptime == ""||this.selectedStatus=="" ){
         this.error = "Please fill all the fields"
       }
    else{
      this.player = new Player(this.addPlayerForm.value.pname,
                               this.selectedRank,
                               this.addPlayerForm.value.pscore,
                               this.addPlayerForm.value.ptime,
                               this.selectedGame,
                               this.selectedStatus );
      console.log("Player in component: "+this.player.player)
      this._playerService.addPlayer(this.player).subscribe(res=>this.response = res)
      this.router.navigate(['dashboard'])
    }
  }

}
