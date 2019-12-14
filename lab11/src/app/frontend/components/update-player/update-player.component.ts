import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/backend/services/players/players.service';
import { Player } from 'src/app/backend/models/Player';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GamesService } from '../../../backend/services/games/games.service';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.scss']
})
export class UpdatePlayerComponent implements OnInit {
  player:Player;
  games:Array<any>;
  selectedGame:'';
  selectedStatus:'';
  selectedRank:'';
  userId:String;
  error: any;
  addPlayerForm: FormGroup;
  constructor(private _playerService:PlayersService,private router:Router,private activatedRoute: ActivatedRoute,public fb:FormBuilder,private _gamesService:GamesService) {
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
    this.activatedRoute.params.subscribe(params=>{
      const userId = params['id'];
      this.userId = userId;
      this._playerService.getPlayer(userId).subscribe(res=>this.player = res);
    }) 
    this._gamesService.getGames().subscribe(res=>{
      this.games = res;
    } 
    )
    this.addPlayerForm.controls["pname"].setValue(this.player.player);

    
  }
  selectedR(event:any){
    this.selectedRank = event.target.value.substring(3);
  }
  selectedG(event:any){
    this.selectedGame = event.target.value.substring(3);
  }
  selectedS(event:any){
    this.selectedStatus = event.target.value;
  }
  public update(){
    console.log("Player: "+this.addPlayerForm.value.pname)
    console.log("Score: "+this.addPlayerForm.value.pscore)
    console.log("Time: "+this.addPlayerForm.value.ptime)
    console.log("Rank: "+this.selectedRank)
    console.log("Game: "+this.selectedGame)
    console.log("Status: " +this.selectedStatus)
    if(this.selectedRank==""||
       this.selectedGame==""||
       this.addPlayerForm.value.ptime == ""||this.selectedStatus=="" ){
         this.error = "Please fill all the fields"
       }
    else{
      let name = (this.addPlayerForm.value.pname!="")?this.addPlayerForm.value.pname:this.player.player;
      let score = (this.addPlayerForm.value.pscore!="")?this.addPlayerForm.value.pscore:this.player.score;
      this.player = new Player(name,
        this.selectedRank,
        score,
        this.addPlayerForm.value.ptime,
        this.selectedGame,
        this.selectedStatus );
      this._playerService.update(this.player, this.userId).subscribe(res=>{
        console.log("response is" + res)

      })
      this.router.navigate(['dashboard'])
    }
  }

}
