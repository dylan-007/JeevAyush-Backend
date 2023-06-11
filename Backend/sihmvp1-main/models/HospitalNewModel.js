'use strict';

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HospitalNewSchema = new Schema({

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
    registration_number : {
        type: Number,
        // required:true,
    },
    phone_number : {
        type: [Number],
        // required:true,
    },
    address : {
        type: String,
        // required:true,
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

    specialities : {
        type : String
    },

    services : {type: mongoose.Schema.Types.ObjectId, ref: 'ServicesModel'},
    
    branch : {
        type : String
    },
    no_of_doctors : {
        type : Number
    },

    total_staff : {
        type : Number
    },

    url : {
        type: String
    },

    email : {
        type: String,
        // required : true
    },

    createdOn: {
        type:Date,
        default:Date.now
    }
});

// create and export model
module.exports = mongoose.model("HospitalNewModel", HospitalNewSchema,"hospitalNew");