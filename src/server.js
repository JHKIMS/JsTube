import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import { localMiddleware } from "./middleware";
import apiRouter from "./routers/apiRouter";

const app = express();
const morganMiddleware = morgan("dev");


app.set("view engine", "pug"); // 우리가 pug을 쓴다는 것을 express에게 알려준다.
app.set("views", process.cwd() + "/src/views");
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: true })); // express가 form의 value을 이해할 수 있게 한다. 우리가 사용할 수 있게 자바스크립트 형식으로 준다.

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie:{
    //     maxAge:5000, // 5초후에 자동으로 로그아웃 된다.
    // },
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL
    }) // 세션이 DB에 저장되어 있기 때문에 서버를 껏다켜도 로그인이 유지된다.
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((eroor, sessions) => {
    console.log(sessions);
    next();
  });
});

app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id}`);
});
app.use(localMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
