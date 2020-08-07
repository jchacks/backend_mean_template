import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import models from "./models";
import sessionManagementConfig from "./middleware/session";

const app = express();

// Some some random thingies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(methodOverride("_method"));
sessionManagementConfig(app);

// Add models and the authenticated user
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: 1, //await models.User.findByLogin("rwieruch"),
  };
  next();
});

// Example of storing data on session and 
// retrieving it between requests
app.get("/a", (req, res) => {
  console.log(req.session, );
  res.send(req.session.var);
});

app.get("/a/:var", (req, res) => {
  console.log(req.session, req.params.var);
  req.session.var = req.params.var;
  res.send(req.params.var);
});

// TODO: Not sure this should be called session as it is 
// different from the mongo db sessions
app.use("/session", routes.session);
app.use("/users", routes.user);

app.get("*", function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 301;
  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect("/not-found");
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

export default app;
