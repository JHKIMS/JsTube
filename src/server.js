import express from "express";

const app = express();
const PORT = 4000;

const loggerMiddleware = (req, res, next) => {
    console.log(`Someone ${req.method} ${req.url}`)
    next();
}
const protectMiddleware = (req,res,next) => {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>")
    }
    console.log("Passed")
    next();
}

const controllerHome = (req, res) => { 
    return res.end("Response Here");
}
const controllerLogin = (req, res) => {
    return res.end("Login Here");
}
const controllerProtect = (req, res) =>{
    return res.end("Welcome to Protected Lounge")
}

app.use(loggerMiddleware);
app.use(protectMiddleware);
app.get("/", controllerHome);
app.get("/login", controllerLogin);
app.get("/protected", controllerProtect);

const handleListening = () => {
    console.log(`🔨 Server Listen http://localhost:${PORT} 🐳`)
}
app.listen(PORT, handleListening)