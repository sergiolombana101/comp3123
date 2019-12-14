const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./src/app/backend/database/db");
var db;


//EXPRESS APIs
const api = require("./src/app/backend/routes/auth.routes");

//MONGODB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);

//EXPRESS SETTINGS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cors());

// SERVE STATIC RESOURCES
app.use('/api', api)

//CHANGING ROOT DIRECTORY SO EXPRESS LOOKS FOR INDEX.HTML INSIDE THE DIST FOLDER
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'));
});


//DEFINE PORT
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://admin:adminroot1@ds041238.mlab.com:41238/heroku_chpn9r2l", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// EXPRESS ERROR HANDLING
/*app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});*/

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

