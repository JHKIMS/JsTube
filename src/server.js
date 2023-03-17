import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import { localMiddleware } from "./middleware";

const app = express();
const morganMiddleware = morgan("dev");

app.set("view engine", "pug"); // 우리가 pug을 쓴다는 것을 express에게 알려준다.
app.set("views", process.cwd() + "/src/views");
app.use(morganMiddleware);
app.use(express.urlencoded({extended: true})) // express가 form의 value을 이해할 수 있게 한다. 우리가 사용할 수 있게 자바스크립트 형식으로 준다.

app.use(session({
    secret: "Hello",
    resave: true,
    saveUninitialized: true,
}));

app.use((req,res,next) =>{
    req.sessionStore.all((eroor, sessions)=>{
        console.log(sessions);
        next();
    })
})

app.get("/add-one",(req,res,next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}`);
})
app.use(localMiddleware);
app.use("/",rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

