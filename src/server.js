import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const morganMiddleware = morgan("dev");

app.set("view engine", "pug"); // 우리가 pug을 쓴다는 것을 express에게 알려준다.
app.set("views", process.cwd() + "/src/views");
app.use(morganMiddleware);
app.use(express.urlencoded({extended: true})) // express가 form의 value을 이해할 수 있게 한다. 우리가 사용할 수 있게 자바스크립트 형식으로 준다.
app.use("/",rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

