export class Player{
    player:String;
    rank:String;
    score:String;
    time:String;
    favGame:String
    games_played:String;
    status:String;
    constructor(player:String, rank:String,score:String,time:String,gamesp:String,status:String){
        this.player = player,
        this.rank = rank,
        this.score = score,
        this.time = time,
        this.games_played = gamesp,
        this.status = status
        this.favGame = gamesp
    }

}