const patientsController={};

import patientsModel from "../models/Patients.js";

//SELECT************************************************
patientsController.getPatients = async(req, res) =>{
    const patients = await patientsModel.find();

    res.json(patients)
}

//UPDATE************************************************
patientsController.putPatients = async(req,res) =>{
    const{name, age, email, password, telephone, isVerified} = req.body;
    const updatePatients = await patientsModel.findByIdAndUpdate(req.params.id, {name, age, email, password, telephone, isVerified}, {new: true})
    res.json({message: "Patient updated"})
}

//DELETE************************************************

patientsController.deletePatients = async(req,res) =>{
    await patientsModel.findByIdAndDelete(req.param.id)

    res.json({message: "Patient deleted"})
}

export default patientsController;