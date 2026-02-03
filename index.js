import express from "express";
import session from "express-session";
import {} from "dotenv/config";
import { databaseRSOnline, databaseSIRS } from "./config/Database.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

try {
  await databaseSIRS.authenticate();
  console.log("database sirs connected...");
} catch (error) {
  console.log(error);
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(
  session({
    secret: "a8d2c9b6-61f2-4e7a-a8cf-7f7d9a8978e4",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

try {
  await databaseRSOnline.authenticate();
  console.log("database rsonline connected...");
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: [process.env.ORIGIN] }));

// app.use(function(req, res, next){
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5001, () => {
  console.log("server running at port 5001");
});
