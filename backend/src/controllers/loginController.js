import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import patientsModel from "../models/Patients.js"
import doctorsModel from "../models/Doctors.js"

const loginController ={};

loginController.login = async(req, res) =>{
    const {email, password} = req.body;

    try {

        let userFound;
        let UserType;

        //ADMIN
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "admin",
            userFound = {_id: "email"}
        }else{
            //2. DOCTOR
            userFound = await doctorsModel.findOne({email})
            userType = "doctor"
            
            //3. PACIENTE
            if(!userFound){
                userFound = await patientsModel.findOne({email})
                userType = "patient"
            }
        }

        if(!userFound){
            console.log("No se encontró el usuario");
            return res.json({message: "User not found"});
        }

        if(userType !== "admin"){
            //veamos si la contraseña que se esta escribiendo en el login es la misma que la que esta en la base de datos
            const isMatch = await bcrypt.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "Contraseña incorrecta"})
            }
            
           }

            //--> TOKEN <--
            jsonwebtoken.sign(
                //1. lo que voy a guardar
                {id: userFound._id, userType},
    
                //2: secreto
                config.JWT.secret,
                
                //3. cuando expira
                {expiresIn: config.JWT.expiresIn},
    
                //4. funcion flecha
                (error, token) =>{
                    if(error) console.log(error)
    
                        res.cookie("authToken", token)
                        res.json({message: "login successful"})
                }
               )

    } catch (error) {
        res.json({message: "error"})
    }
}
export default loginController;