const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let adminSchema = new Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
},{
    collection: 'admin'
})

//THIS METHOD WONT LET A DUPLICATE EMAIL ID TO BE STORED IN THE DATABASE
adminSchema.plugin(uniqueValidator, {message:'Email already in use.'});
//IT EXPORTS THE CLASS SO OTHER SERVICES CAN ACCESS IT
module.exports = mongoose.model('Admin',adminSchema)