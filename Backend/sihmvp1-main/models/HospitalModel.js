'use strict';

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HospitalSchema = new Schema({

    hospitalID : {
        type : String,
        required : true
    },

    name : {
        type:String,
        required:true
    },
    type : {
        type:String,
        required:true
    },

    opening_time: {
        type:String
    },

    closing_time: {
        type:String
    },

    state : {
        type: String,
        required:true,
    },
    city : {
        type: String,
        required:true,
    },
    registration_number : {
        type: Number,
        required:true,
    },
    phone_number : {
        type: [Number],
        required:true,
    },
    address : {
        type: String,
        required:true,
    },
    approved : {
        type : Boolean,
        default : false
    },

    documentID : {
        type : String ,
    },

    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required : true
        },
        coordinates: {
          type: [Number],
          required : true
        }
    },

    services : {type: mongoose.Schema.Types.ObjectId, ref: 'ServicesModel'},

    url : {
        type: String
    },

    email : {
        type: String
    },

    createdOn: {
        type:Date,
        default:Date.now
    }
});

// create and export model
module.exports = mongoose.model("HospitalModel", HospitalSchema,"hospitals");