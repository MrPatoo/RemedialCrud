import jsonwebtoken from "jsonwebtoken";//token
import bcrypt from "bcryptjs";//encriptar
import nodemailer from "nodemailer";//enviar correo
import crypto from "crypto";//codigo aleatorio

import patientsModel from "../models/Patients.js"
import { config } from "../config.js";

//array
const registerPatientsController = {};

//REGISTRAR PACIENTE
registerPatientsController.register = async(req, res) =>{

    //solicitar los datos
    const{name, age, email, password, telephone, isVerified}=req.body;

    try {
        //verificamos si el paciente ya existe
        const existingPatient = await patientsModel.findOne({email})
        if(existingPatient){
            return res.json({message:"Patient already exist"})
        }

        //encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        //guardamos el paciente en la base de datos
        const newPatient = new patientsModel({name, age, email, password: passwordHash, telephone, isVerified});
        await newPatient.save();



        //TOKEN***************
        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
              //1- lo que voy a guardar
            {email, verificationCode},

            //2- secreto
            config.JWT.secret,

            //cuando expira(2 horas)
            {expiresIn: '2h'} );

        //COOKIE*******************
        res.cookie("verificationToken", tokenCode)

        //correo
        //1- quien lo manda
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user, 
                pass: config.email.email_pass 
            }
        })

        //2- quien lo recibe
        const mailOptions = {
            from: config.email.email_user,
            to: email, 
            subject: "Verificar Correo",
            text: "Para verificar su correo utilizan el siguiente código " + verificationCode + "\n expira en dos horas"
        };

        //3- enviar el correo
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                return res.json({message: "Error sending email" + error})
            }
            console.log("Email sent" + info);
        })
        res.json({message:"Patient registered ,Please verify your email with the code"})

    } catch (error) {
        console.log("Error: " + error)
    }

}

//VERIFICAR CODIGO
registerPatientsController.verificationCode = async(req, res) =>{
    const {requireCode} = req.body
    const token = req.cookies.verificationToken;

    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;
        
        //comparar el codigo que envie por correo y esta guardado en las cookies
        if(requireCode !== storedCode){
                return res.json({message:"Invalid code"});
        }

        const patient = await patientsModel.findOne({email});
        patient.isVerified = true;
        await patient.save();

        res.clearCookie("verificationToken")//nombre de la cookie
        res.json({message:"Email verified successfuly"})
    } catch (error) {

        console.log("Error: "+ error);
    }
}
export default registerPatientsController;