import express from "express";

const app = express();

const handleListening = () => {
    console.log("Server Listening on Port 4000 🐳")
}
app.listen(4000, handleListening)