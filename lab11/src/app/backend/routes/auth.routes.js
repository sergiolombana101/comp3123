const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // TO SECURE THE PASSWORD, IT HASHED A PASSWORD IN THE DATABASE
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const adminSchema = require("../server/models/Admin");
let adminCollection = null;
let playersCollection = null;
let gamesCollection = null;
let db = null;

//Connecting -> mongodb://admin:adminroot1@ds041238.mlab.com:41238/heroku_chpn9r2l
const connection = (closure) => {
    MongoClient.connect(process.env.MONGODB_URI || "mongodb://admin:adminroot1@ds041238.mlab.com:41238/heroku_chpn9r2l",(err, database)=> {
    db = database.db('heroku_chpn9r2l');
    adminCollection = db.collection('admin'); //Retrieves admin collection
    playersCollection = db.collection('players'); //Retrieves players collection
    gamesCollection = db.collection('games');
    if (err) {
    console.log(err);
    process.exit(1);
    }
    closure(database);
});
};

function isPasswordValid(p1,p2){
    if(p1 == p2){
        return true
      }
      this.error = {
        status:401,
        message:"Invalid password"
      }
      return false
}

//Response handling
let response = {
    status : 200,
    dataL:[],
    message : null
};
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}


router.post("/auth", (req,res)=>{
    let getUser;
    connection((db)=>{
        adminCollection
            .find({email:req.body.email}).toArray().then(admin=>{
                if(isEmpty(admin)){
                    response.data = {
                        status: 400,
                        message:"User not found!"}
                }else{
                    if(req.body.password == admin[0].password){
                        console.log("Password correct")
                        let adminCredentials = {
                            email:admin[0].email,
                            message : "Authentication successful"
                        }  
                        response.data = adminCredentials;
                    }else{
                        console.log("Password incorrect")
                        response.data = {
                            status: 401,
                            message: "Invalid password"
                        }
                    }
                }
                res.json(response)
                
            }).catch((err) => {
                console.log(err)
            });
    });   
});

router.get('/players', (req,res)=>{
    connection((db) => {
        playersCollection
            .find()
            .toArray()
            .then((players)=>{
                response.data = players;
                res.json(response);            
            })
            .catch((err) => {
                sendError(err,res);
            });
    });

})
router.get('/games',(req,res)=>{
    connection((db)=>{
        gamesCollection
            .find()
            .toArray()
            .then((games)=>{
                response.data = games;
                res.json(response);
            })
            .catch((err)=>{
                sendError(err,res);
            });
    });
});
router.get('/player?:id', (req,res)=>{
    var ObjectId = require('mongodb').ObjectId; 
    connection((db)=>{
        playersCollection
            .find({_id:new ObjectId(req.query.id)}).toArray().then(player=>{
                if(isEmpty(player)){

                    response.data = {
                        status:400,
                        message:"Player not found"
                    }
                }else{
                    response.data = {
                        player : player[0].Player,
                        rank : player[0].Rank,
                        favorite_g: player[0].Favorite_Game,
                        score : player[0].Score,
                        time : player[0].Time,
                        games_p : player[0].Games_Played,
                        status : player[0].Status
                    }
                    res.json(response);
                }
            }).catch((err) => {
                console.log(err)
            });
    })
})
router.post("/join", (req,res)=>{
    var ObjectId = require('mongodb').ObjectId; 
    connection((db)=>{
        playersCollection
            .updateOne({_id:new ObjectId(req.body.id)},{$set: {Status:"Unavailable"}},function(err,object){
                if(err){
                    console.log(err.message)
                }else{
                    console.log("Successfully updated")
                }
            });
    })
});
router.post("/addP", (req,res)=>{
    let insertValue = {
        Player : req.body.player.player,
        Rank : req.body.player.rank,
        Favorite_Game : req.body.player.favGame,
        Score:req.body.player.score,
        Time:req.body.player.time,
        Games_Played:req.body.player.games_played,
        Status:req.body.player.status
    }
    connection((db)=>{
        let resp = {}
        playersCollection
            .insertOne(insertValue,function(err,object){
                if(err){
                    resp = {
                        message: "Player could not be added"
                    }
                }else{
                    resp = {
                        message: "Player Added Succesfully"
                    }
            
                }
                res.json(resp)
            })
    })
})

router.post("/delete", (req,res)=>{
    var ObjectId = require('mongodb').ObjectId; 
    let myquery = {_id:new ObjectId(req.body.id)};
    connection((db)=>{
        let resp = {}
        playersCollection
            .deleteOne(myquery, function(err,obj){
                if(err){
                    resp = {
                        message: err.message
                    }
                }else{
                    resp = {
                        message: "Player deleted successfully"
                    }
                }
                res.json(resp)
            })
    })

})

router.post("/update", (req, res)=>{
    var ObjectId = require('mongodb').ObjectId; 
    var query = { $set:{
        Player : req.body.player.player,
        Rank : req.body.player.rank,
        Favorite_Game : req.body.player.favGame,
        Score:req.body.player.score,
        Time:req.body.player.time,
        Games_Played:req.body.player.games_played,
        Status:req.body.player.status
    }
    }
    connection((db)=>{
        let resp = {}
        playersCollection
            .updateOne({_id:new ObjectId(req.body.id)}, query, function(err,res){
                if(err){
                    resp = {
                        message: "Player could not be updated"
                    }
                }else{
                    resp = {
                        message: "Player Updated Succesfully"
                    }
                }
            })
            res.json(resp)
    })
})
module.exports = router;