import "dotenv/config";
import { mongoose } from "./db";
import app from "./app.js";

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
