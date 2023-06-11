const  Patient  = require("../models/PatientModel");
const Inquiry =  require("../models/InquiryModel");

// createNewTodo function - To create new todo
exports.createNewPatient = (req, res) => {
    let  patient = new Patient (req.body);

    patient.save((err, todo) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(201).json(todo);
    });
};


// listAllTodos function - To get all todos
exports.listAllPatients = (req, res) => {
    Patient.find({}, (err, todo) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(200).json(todo);
    });
};


// updateTodo function - To update todo status by id
exports.updatePatient = (req, res) => {
    Patient.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, patient) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(200).json(patient);
    });
};

// deleteTodo function - To delete todo by id
exports.deletePatient = ( req, res) => {
    Patient.deleteOne({ _id:req.params.id }, (err) => {
    if (err) {
        res.status(404).send(err);
    }
        res.status(200).json({ message:"Patient successfully deleted"});
    });
};


//send inquiry to hospital

exports.sendInquiry = (req, res) => {
    
    let  inquiry = new Inquiry (req.body);

    inquiry.save((err, todo) => {
    if (err) {
        res.status(500).send(err);
    }
        res.status(201).json(todo);
    });
};

