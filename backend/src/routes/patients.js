import express from "express";

const router = express.Router();

router.route("/")
.get()
//no registro------

router.route("/:id")
.put()
.delete()

export default router