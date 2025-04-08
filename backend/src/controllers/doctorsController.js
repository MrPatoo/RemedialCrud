const doctorsController = {};

import doctorsModel from "../models/Doctors.js";

//SELECT
doctorsController.getDoctors = async (req, res) =>{
    const doctors =await doctorsModel.find()

    res.json(doctors)
}

//UPDATE
doctorsController.putDoctors = async (req, res) =>{
    const { name, especialty, email, password }= req.body;
    const update = await doctorsModel.findByIdAndUpdate(req.params.id, {name, especialty, email, password}, {new: true})

        res.json({message: "Doctor updated successfully"})

};

//DELETE
doctorsController.deleteDoctors = async (req, res) =>{
    await doctorsModel.findByIdAndDelete(req.params.id)

    res.json({message: "Doctor deleted"})
}


export default doctorsController;