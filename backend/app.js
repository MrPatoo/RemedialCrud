import express from "express";

//imports
import patientsRoutes from "./src/routes/patients.js";
import patientsRegisterRoutes from "./src/routes/patientsRegister.js"


//Creo una constante que es igual a la libreria que acabo de crear, y la ejecuto.
const app = express();

app.use(express.json());

//para usar las cookies
app.use (cookieParser());



//ROUTES**************************************************
app.use("/api/patients", patientsRoutes);
app.use("/api/registerPatients", patientsRegisterRoutes)


export default app;
