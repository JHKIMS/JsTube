import express from "express";

const app = express();
const PORT = 4000;

const handleHome = () => { console.log("Trying to go home")}
app.get("/", handleHome);

const handleListening = () => {
    console.log(`🔨 Server Listen http://localhost:${PORT} 🐳`)
}
app.listen(PORT, handleListening)