'use strict'

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	//name:{type:String,required:true},
    local : {
        email : String,
        password : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
   // eth_address: {type: String, required: true},
    //role: {type: String, required: true},
    is_email_verify:{type:String,enum:['0','1']},
    created_at : { type : Date, default : Date.now},
    updated_at:{type:Date,default:Date.now}
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);