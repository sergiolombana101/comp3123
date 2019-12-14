import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../backend/models/Admin';
import { AuthService } from 'src/app/backend/services/auth/auth.service';
import { PlayersService } from '../../../backend/services/players/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  admin:Admin;

  players:Array<any>;
  constructor(private _playersService : PlayersService, public router: Router) {
    this._playersService.getPlayers().subscribe(res=>this.players = res);
   }

  ngOnInit() {
  }

  public logout(){
    localStorage.removeItem("User")
    this.router.navigate([""]);
  }

  public delete(event){
    let id = event.target.value;
    this._playersService.delete(id).subscribe(res=>{      
    })
    
    window.location.reload();
  }
}
