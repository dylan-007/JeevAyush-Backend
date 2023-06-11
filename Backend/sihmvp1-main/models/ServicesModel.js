'use strict';

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServicesSchema = new Schema({
    
    dermatology : {
        type : Boolean,
        default : false
    },

    immunology : {
        type : Boolean,
        default : false
    },

    gastroenterology : {
        type : Boolean,
        default : false
    },

    hepatology : {
        type : Boolean,
        default : false
    },

    pharma : {
        type : Boolean,
        default : false
    },

    hiv : {
        type : Boolean,
        default : false
    },

    endocrinology : {
        type : Boolean,
        default : false
    },

    asthma : {
        type : Boolean,
        default : false
    },

    cardiology : {
        type : Boolean,
        default : false
    },

    neurology : {
        type : Boolean,
        default : false
    },

    otolaryngology : {
        type : Boolean,
        default : false
    },

    paralysis : {
        type : Boolean,
        default : false
    },

    general : {
        type : Boolean,
        default : false
    },

    microbiology : {
        type : Boolean,
        default : false
    },

    pulmonology : {
        type : Boolean,
        default : false
    },

    pediatric : {
        type : Boolean,
        default : false
    },

    proctology : {
        type : Boolean,
        default : false
    },

    orthopedy : {
        type : Boolean,
        default : false
    },

    ent : {
        type : Boolean,
        default : false
    },

    urology : {
        type : Boolean,
        default : false
    },

    hospitalID : {type: String, ref: 'HospitalModel'},

    createdOn: {
        type:Date,
        default:Date.now
    }
});

// create and export model
module.exports = mongoose.model("ServicesModel", ServicesSchema,"services");