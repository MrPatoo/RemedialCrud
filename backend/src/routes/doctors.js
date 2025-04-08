import express from "express";
import doctorsController from "../controllers/doctorsController.js";

const router = express.Router();

router.route("/")
.get(doctorsController.getDoctors)
//no registro------

router.route("/:id")
.put(doctorsController.putDoctors)
.delete(doctorsController.deleteDoctors)

export default router