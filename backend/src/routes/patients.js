import express from "express";
import patientsController from "../controllers/patientsController.js";

const router = express.Router();

router.route("/")
.get(patientsController.getPatients)
//no registro------

router.route("/:id")
.put(patientsController.putPatients)
.delete(patientsController.deletePatients)

export default router