const  Hospital  = require("../models/HospitalNewModel");
const Service =  require("../models/ServicesModel");
const Inquiry =  require("../models/InquiryModel");
const {diseaseMap} = require("../diseaseMap.js");
const mongoose = require("mongoose");
const axios = require('axios');



// createNewTodo function - To create new todo
exports.createNewHospital = (req, res) => {

    let data = req.body;

    data["location"] = {
        "type" : "Point",
        "coordinates" : [
            req.body.longitude,
            req.body.latitude
        ]
    }

    delete data.latitude ;
    delete data.longitude ;

    let  hospital = new Hospital (data);

    hospital.save((err, todo) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(201).json(todo);
    });

}  



// listAllTodos function - To get all todos
exports.listAllHospitals = (req, res) => {

    Hospital.find({}, (err, todo) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(200).json(todo);
    });
};


exports.getHospital = (req, res) => {

    Hospital.find({ hospitalID:req.params.id }, (err, todo) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(200).json(todo);
    });
};



exports.getNearbyHospitals = async (req, res) => {

    let current_lat = req.params.lat;
    let current_long = req.params.long;
    let radius = Number(req.params.radius);

    const distanceInKilometer = radius/1000;
    radius = distanceInKilometer / 6378.1;

    const result = await Hospital.find({
      location: { $geoWithin: { $centerSphere: [[current_long, current_lat], radius] } } , approved : true
    });

    res.send(result);

};



exports.getNearbyHospitalsSymptoms = async (req, res) => {

    let current_lat = req.params.lat;
    let current_long = req.params.long;
    let radius = req.params.radius;
    let symptoms = req.params.symptoms;

    var symptomsArray = symptoms.split(',');

    console.log(symptomsArray);

    //connect to Flask API
    //http://ec2-34-238-136-236.compute-1.amazonaws.com:8080/api

    const response = await axios.post('http://ec2-34-238-136-236.compute-1.amazonaws.com:8080/api', {
        symptoms : symptomsArray
    });

    const category = diseaseMap(response.data['diseases']);

    console.log(category);

    const distanceInKilometer = radius/1000;
    radius = distanceInKilometer / 6378.1;
   

    Hospital.find({
        location: { $geoWithin: { $centerSphere: [[current_long, current_lat] , radius ]}} , approved : true }).populate('services').exec(function(err, hospitals) {

        if (err) {
            res.status(500).send(err);
        } 

        var matches = [];
        var matchCount = 0;
    
        hospitals.forEach(function(hospital) {
            
            if(hospital?.services !== undefined && hospital.services[category] == true){
                matchCount = matchCount + 1;
                matches.push(hospital);
            }

        });

       // console.log(matches);

        if(matches.length == 0){
            hospitals.unshift({details : {matchCount : matchCount, category : category}});
            res.status(200).json(hospitals);
        }
        else{
            matches.unshift({details : {matchCount : matchCount, category : category}});
            res.status(200).json(matches) ;
        }
    });

};

exports.getApprovedHospitals = (req, res) => {
    Hospital.find({approved : true}, (err, todo) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(200).json(todo);
    });
};

exports.createHospitalService = (req, res) => {

    const data = req.body;

    data['hospitalID'] = req.params.hospitalID;

    Service.findOneAndUpdate(
        {hospitalID : req.params.hospitalID},
        { $set: data },
        { upsert: true, new: true } , (err, ser) => {
    
            if (err) {
                res.status(500).send(err);
            }
    
                Hospital.updateMany({ hospitalID: req.params.hospitalID},{$set: {services : ser._id}}, { new:true } , (err,temp) => {console.log(temp)});
            
                res.status(200).json(ser);
    });

};


// updateTodo function - To update todo status by id
exports.updateHospital= (req, res) => {
    Hospital.findOneAndUpdate({ hospitalID:req.params.id }, req.body, { new:true }, (err, hospital) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(200).json(hospital);
    });
};

// deleteTodo function - To delete todo by id
exports.deleteHospital = ( req, res) => {
    Hospital.deleteOne({ hospitalID:req.params.id }, (err) => {
    if (err) {
        res.status(404).send(err);
    }
        res.status(200).json({ message:"Hospital successfully deleted"});
    });
};


//get all inquiry of hospital

exports.getInquiry = (req, res) => {

    let hospitalID = req.params.hospitalID;

    Inquiry.find({hospitalID : hospitalID}).sort('-createdOn').exec((err, docs) => { 

        if (err) {
            res.status(500).send(err);
        }
            res.status(200).json(docs);
        });
};
