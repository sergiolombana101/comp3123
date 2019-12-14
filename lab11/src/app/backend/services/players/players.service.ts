import { Injectable } from '@angular/core';

import {Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Player } from '../../models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  result:any;

  constructor(private _http:Http,private http: HttpClient,) { }

  getPlayers(){
    return this._http.get("/api/players")
      .pipe(map(result=>this.result = result.json().data));
  }
  getPlayer(id:String){
    return this._http.get("/api/player?id="+id)
      .pipe(map(result=>this.result = result.json().data));

  }
  join(id:number){
    return this.http.post("/api/join",{id:id})
      .pipe(map(result=>this.result = this.result.json().data));
  }
  addPlayer(player:Player){
    return this.http.post("/api/addP",{player:player})
      .pipe(map(result=>{
          console.log(JSON.stringify(result))
        })
      )
  }
  delete(id:String){
    console.log("Delete in service called with id "+ id);
    return this._http.post("/api/delete",{id:id})
      .pipe(map(result=>{
        console.log("Response form api in delete is: "+ result);
      }))
  }
  update(player:Player, id:String){
    return this._http.post("api/update", {player:player, id:id})
      .pipe(map(res=>{
        console.log("Response in service update is: "+res.json().data);
      }))
  }
}
 