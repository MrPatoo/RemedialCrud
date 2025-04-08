import express from "express";


//Creo una constante que es igual a la libreria que acabo de crear, y la ejecuto.
const app = express();

app.use(express.json());

//para usar las cookies
//-----> app.use (cookieParser());



//ROUTES**************************************************

export default app;
