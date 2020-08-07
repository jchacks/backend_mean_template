import mongoose from "mongoose";
const databaseUrl = process.env.MONGOURL || "mongodb://localhost:27017/default";

console.log(`Connecting to mongo at '${databaseUrl}'`);
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
