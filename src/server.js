import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const morganMiddleware = morgan("dev");

app.set("view engine", "pug"); // 우리가 pug을 쓴다는 것을 express에게 알려준다.
app.set("views", process.cwd() + "/src/views");
app.use(morganMiddleware);
app.use("/",globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleListening = () => {
    console.log(`🔨 Server Listen http://localhost:${PORT} 🐳`)
}
app.listen(PORT, handleListening)