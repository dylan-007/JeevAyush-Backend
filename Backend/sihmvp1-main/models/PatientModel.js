'use strict';

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    type : {
        type:String,
        required:true
    },

    age : {
        type: Number,
        required:true
    },

    createdOn: {
        type:Date,
        default:Date.now
    }
});

// create and export model
module.exports = mongoose.model("PatientModel", PatientSchema,"patients");