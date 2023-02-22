import express from "express";

const app = express();
const PORT = 4000;

const handleHome = (req, res) => { 
    return res.end("Response Here");
}
const handleLogin = (req, res) => {
    return res.end("Login Here");
}
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => {
    console.log(`🔨 Server Listen http://localhost:${PORT} 🐳`)
}
app.listen(PORT, handleListening)