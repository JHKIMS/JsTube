import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const morganMiddleware = morgan("dev");

const controllerHome = (req, res) => { 
    return res.end("Response Here Home");
}
const controllerLogin = (req, res) => {
    return res.end("Login Here");
}
const controllerProtect = (req, res) =>{
    return res.end("Welcome to Protected Lounge")
}

app.use(morganMiddleware);
app.get("/", controllerHome);
app.get("/login", controllerLogin);

const handleListening = () => {
    console.log(`🔨 Server Listen http://localhost:${PORT} 🐳`)
}
app.listen(PORT, handleListening)