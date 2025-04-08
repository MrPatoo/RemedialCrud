import express from "express";
import registerPatientsController from "../controllers/registerPatientsController.js";

const router = express.Router();

//para ingresar los datos
router.route("/").post(registerPatientsController.register);

//poner verifyemail
router.route("/verifyCodeEmail").post(registerPatientsController.verificationCode)


export default router;