'use strict';

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InquirySchema = new Schema({
    patient_name : {
        type:String,
        required:true
    },

    patient_number : {
        type : Number,
        required:true
    },

    hospitalID : {
        type : String,
        required:true
    },

    resolved : {
        type : Boolean,
        default : false
    },

    message : {
        type : String,   
    },

    patient_symptoms : {
        type : String,
    },

    createdOn: {
        type:Date,
        default:Date.now
    }
});

// create and export model
module.exports = mongoose.model("InquiryModel", InquirySchema,"inquiry");