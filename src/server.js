import express from "express";

const app = express();
const PORT = 4000;

const goMiddleware = (req, res, next) => {
    next();
}
const controllerHome = (req, res) => { 
    return res.end("Response Here");
}
const controllerLogin = (req, res) => {
    return res.end("Login Here");
}
app.get("/", goMiddleware, controllerHome);
app.get("/login", controllerLogin);

const handleListening = () => {
    console.log(`🔨 Server Listen http://localhost:${PORT} 🐳`)
}
app.listen(PORT, handleListening)