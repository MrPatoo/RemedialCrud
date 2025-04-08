/*fields:
    date
    time
    reason
    idDoctor
    idPatient
*/
import { Schema, model } from "mongoose";

const citesSchema = Schema({
    date:{
        type: Date, //año, mes, dia
        require:true
    },

    time:{
        type: String, 
        require: true
    }, 

    reason:{
        type: String,
        require: true
    },

    idDoctor:{
        type:Schema.Types.ObjectId,
        ref: "Doctors",
        require: true
    },

    idPatient:{
        type:Schema.Types.ObjectId,
        ref: "Patients",
        require: true
    }


},{
    timestamps: true,
    strict: false
})

export default model("Cites", citesSchema);