'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name:{type:String,required:true},
	email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    eth_address: {type: String, required: true},
    role: {type: String, required: true}
    is_email_verify:{type:String,enum:['0','1']},
    created_at : { type : Date, default : Date.now},
    updated_at:{type:Date,default:Date.now}
})

module.exports = mongoose.model('users', schema);