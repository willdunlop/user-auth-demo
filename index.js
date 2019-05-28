import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import config from "config";
import debug from "debug";

import routes from "./routes";

if(config.get("JWT_PRIVATE_KEY") === undefined || !config.get("JWT_PRIVATE_KEY")){
    console.error("\x1b[31mFatal Error:\x1b[37m The JWT_PRIVATE_KEY variabe was not defined");
    process.exit(1);
}

const log = {
    info: debug("app:info"),
    db: debug("app:db"),
    launch: debug("app:launch")
}

const PORT = process.env.PORT || 3000;  //  env variable is set with `export PORT = 8000` as an example
/** Connect to the DB */
mongoose.connect("mongodb://localhost/MongoDemo", { useNewUrlParser: true });


/** Initiate the app */
const app = express();
const isProd = process.env.NODE_ENV === "production";
/** 
 * Configure app and it's middleware.
 * Every request passes through the middleware before being handled by one of the 
 * route handlers below
 */
app.use(helmet());                                          // Some decent protection for the app
app.use(express.json());                                    //  Will parse JSON formats
app.use(express.urlencoded({ extended: true }))             //  will parse urlencoded key=value&key=value
if (!isProd) app.use(morgan("tiny"));                       // Logs shit, disable when prod
// app.use(express.static("public"));                       //  Serves the static folder called public   

log.launch("AppName", config.get("name"));


app.use("/api", routes);


/** Dummy data becase fuck databses for now */

app.listen(PORT, () => log.info(`App is listening on port ${PORT}`));