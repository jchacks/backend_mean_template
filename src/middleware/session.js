import { mongoose } from "../db";
import session from "express-session";
import mongoStoreFactory from "connect-mongo";

export default function sessionManagementConfig(app) {
  console.log("Configuring session store.")
  const MongoStore = mongoStoreFactory(session);

  app.use(
    session({
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
      }),
      secret: process.env.SESSIONSECRET || "123",
      saveUninitialized: true,
      resave: false,
      cookie: {
        path: "/",
      },
      name: "id",
    })
  );

  // I dont like this it hides away the session logic...
  // Maybe thats a good thing?

  // session.Session.prototype.login = function (user, cb) {
  //   this.userInfo = user;
  //   cb();
  // };
  
  console.log("Configured session store.")
}
