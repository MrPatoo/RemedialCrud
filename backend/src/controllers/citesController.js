const citesController = {};

import citesModel from "../models/Cites.js";

//SELECT
citesController.getCite = async (req, res) =>{
    const cites =await citesModel.find()

    res.json(cites)
}

//INSERT
citesController.postCites = async(req, res) =>{
    const{ date, time, reason, idDoctor, idPatient } = req.body;
    const newCites = new citesModel({date, time, reason, idDoctor, idPatient})
    await newCites.save();

    res.json({message:"cite saved"})
}

//UPDATE
citesController.putCites = async (req, res) =>{
    const { date, time, reason, idDoctor, idPatient }= req.body;
    const update = await citesModel.findByIdAndUpdate(req.params.id, {date, time, reason, idDoctor, idPatient}, {new: true})

        res.json({message: "Cite updated successfully"})

};

//DELETE
citesController.deleteCites = async (req, res) =>{
    await citesModel.findByIdAndDelete(req.params.id)

    res.json({message: "Cite deleted"})
}


export default citesController;