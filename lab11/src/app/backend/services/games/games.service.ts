import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  result:any;

  constructor(private _http:Http) { }

  getGames(){
    return this._http.get("/api/games")
      .pipe(map(result=>this.result =  result.json().data));
  }
}
