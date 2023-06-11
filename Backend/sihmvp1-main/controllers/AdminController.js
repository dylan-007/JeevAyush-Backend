const  Hospital  = require("../models/HospitalNewModel");
const Service =  require("../models/ServicesModel");
const nodemailer = require("nodemailer");
const { google } = require('googleapis');

//for mailing hospital
const CLIENT_ID = '641721343898-ttfv3ikbman8f12j4ggerhmqd513gj56.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04SOz_W1gtH5LCgYIARAAGAQSNwF-L9Ira7aVnXyO_sf-tw0ddxFvaiSLq08_i5hJcmnuk3jtgzRe9mruvp_ZV9TmskMdjamtrW0';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


// listAllTodos function - To get all todos
exports.getUnapprovedHospitals = (req, res) => {
    Hospital.find({approved : false}).sort('-createdOn').exec((err, docs) => { 

        if (err) {
            res.status(500).send(err);
        }
            res.status(200).json(docs);
    });

};


// updateTodo function - To update todo status by id
exports.approveHospital= async (req, res) => {

    let hospitalID = req.params.id;

    let hospital =  await Hospital.find({hospitalID : hospitalID});

    let emailAddress ;

    if (hospital[0]?.email) {
        emailAddress = hospital[0].email;
      } else {
        // 👇️ this runs
        emailAddress = 'dylandsouza2017@gmail.com';
      }
    
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'dylandsouza2017@gmail.com',
              clientId: CLIENT_ID,
              clientSecret: CLEINT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
        });

        const mailOptions = {
        from: 'dylandsouza2017@gmail.com',
        to: emailAddress,
        subject: 'Ayush Hospital Approved!!',
        text: 'Hello , we are glad to inform you that the AYUSH hospital has been approved'
        };

        const mailres= await transport.sendMail(mailOptions);
        
    }

    catch (error){
        console.log(error)
    }
    
    Hospital.findOneAndUpdate({ hospitalID: hospitalID }, {approved : true}, { new:true }, (err, hospital) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(200).json(hospital);
    });
};


exports.disapproveHospital= async (req, res) => {

    let hospitalID = req.params.id;

    let hospital =  await Hospital.find({hospitalID : hospitalID});

    let emailAddress ;

    if (hospital[0]?.email) {
        emailAddress = hospital[0].email;
      } else {
        // 👇️ this runs
        emailAddress = 'dylandsouza2017@gmail.com';
      }
    
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'dylandsouza2017@gmail.com',
              clientId: CLIENT_ID,
              clientSecret: CLEINT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
        });

        const mailOptions = {
        from: 'dylandsouza2017@gmail.com',
        to: emailAddress,
        subject: 'Ayush Hospital Rejected!!',
        text: 'Hello , we are sorry but your request has been rejected due to lack of proper documents uploaded or incorrect information. Please try again from another account'
        };

        const mailres= await transport.sendMail(mailOptions);
        
    }

    catch (error){
        console.log(error) ;
    }
    
    Hospital.deleteMany({ hospitalID: hospitalID }, (err) => {
        if (err) {
            console.log(err) ;
        }
    });

    Service.deleteMany({ hospitalID: hospitalID }, (err) => {
        if (err) {
            console.log(err) ;
        }
    });

    res.status(200).json({ message:"Hospital data succesfully deleted"});
};

