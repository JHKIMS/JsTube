import "dotenv/config";
import "./db"
import "./models/VideoDb"
import "./models/UserDb"
import app from "./server"


const PORT  = 4000;

const handleListening = () => {
    console.log(`🔨 Server Listen http://localhost:${PORT} 🐳`)
}
app.listen(PORT, handleListening)