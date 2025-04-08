import express from "express";

//imports
import patientsRoutes from "./src/routes/patients.js";
import patientsRegisterRoutes from "./src/routes/patientsRegister.js";
import doctorsRoutes from "./src/routes/doctors.js";
import doctorsRegisterRoutes from "./src/routes/doctorsRegister.js"
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"

//Creo una constante que es igual a la libreria que acabo de crear, y la ejecuto.
const app = express();

app.use(express.json());

//para usar las cookies
//----> app.use (cookieParser());



//ROUTES**************************************************
app.use("/api/patients", patientsRoutes);
app.use("/api/registerPatients", patientsRegisterRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/registerDoctors", doctorsRegisterRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);


export default app;
