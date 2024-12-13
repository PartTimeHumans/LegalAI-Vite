import connectToMongodb from "./src/v1/services/mongodb.js";
import connectTONodemailer from "./src/v1/services/nodemailer.js";
import winston from "./src/v1/configs/winston.js";

import express, { json } from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 4001;

//? Connect to MongoDB modules.
connectToMongodb();

//? connect to Nodemailer
connectTONodemailer();

//? Setting up logs.
import morgan from "morgan";
app.use(cors());
app.use(json());
app.use(morgan("combined", { stream: winston.stream }));
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // add this line to include winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

//? Import Routes.
import accountsRoutes from "./src/v1/routes/accounts.js";
import getCases from "./src/v1/routes/getCases.js";

//? Available routes.
app.use("/api/v1/accounts", accountsRoutes);
app.use("/api/v1/getCases", getCases);

app.listen(port, () => {
  console.log(`Legal AI is listening on port ${port}`);
});
