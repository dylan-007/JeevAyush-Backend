'use strict';

// create App function
module.exports = function(app) {
    var hospital = require('../controllers/HospitalController');
    var patient = require('../controllers/PatientController');
    var admin = require('../controllers/AdminController');
    // Patient Routes

    // get and post request
    app
    .route("/patient")
    .get(patient.listAllPatients)
    .post(patient.createNewPatient);

    // put and delete requests 
    app
    .route("/patient/:id")
    .put(patient.updatePatient)
    .delete(patient.deletePatient);


    //Hospital Routes

    // get and post request
    app
    .route("/hospital")
    .get(hospital.listAllHospitals)
    .post(hospital.createNewHospital);

    app
    .route("/hospitals")
    .get(hospital.getApprovedHospitals)

    // put and delete request 
    app
    .route("/hospital/:id")
    .put(hospital.updateHospital)
    .get(hospital.getHospital)
    .delete(hospital.deleteHospital);

    //get hospitals nearby user
    app
    .route("/hospital/:lat/:long/:radius")
    .get(hospital.getNearbyHospitals)

    //get hospitals nearby user with symptoms
    app
    .route("/hospital/:lat/:long/:radius/:symptoms") 
    .get(hospital.getNearbyHospitalsSymptoms)


    //Services of hospital
    app
    .route("/services/:hospitalID") 
    .post(hospital.createHospitalService)

    //Inquiry -user side
    app
    .route("/user/inquiry")
    .post(patient.sendInquiry)

    //Inquiry -hospital side
    app
    .route("/inquiry/:hospitalID")
    .get(hospital.getInquiry)  //sorted according to created time


    //Admin Routes
    app
    .route("/admin/hospitals")
    .get(admin.getUnapprovedHospitals)
    

    app
    .route("/admin/approve/:id")
    .put(admin.approveHospital)

    app
    .route("/admin/disapprove/:id")
    .put(admin.disapproveHospital)

};