/*fields:
    name
    age
    email
    password
    telephone
    isVerified
*/

import { Schema, model } from "mongoose";

const patientsSchema = new Schema(
    {
        name:{
            type: String,
            require: true
        },
    
        age:{
            type: String,
            require: true
        },

        email:{
            type: String,
            require: true,
            match:[
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/,
                "Por favor ingrese un correo electronico valido", //validar el correo electronico
            ],
        },
    
        password:{
            type: String,
            require: true,
            minlenght: 6 //mínimo de caracteres
        },
    

        telephone:{
            type: String,
            require: true,
            unique: true,
            match: [/^[0-9]{8}$/, "El número de teléfono tiene que ser válido"] //validar número de teléfono
        },

        isVerified:{
            type: Boolean,
            require: true
        }
    

    },{
        //tabla auditoria
        timestamps: true,
        strict: false
    }
)

export default model("Patients", patientsSchema);