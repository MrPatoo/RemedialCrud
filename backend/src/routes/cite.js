import express from "express";
import citesController from "../controllers/citesController.js";

const router = express.Router()

router.route("/")
.get(citesController.getCite)
.post(citesController.postCites)

router.route("/:id")
.put(citesController.putCites)
.delete(citesController.deleteCites)

export default router;