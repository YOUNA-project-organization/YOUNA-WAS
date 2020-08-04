import mongoose from "mongoose";
import { env } from "../constants/constants";
import dotenv from "dotenv";
dotenv.config();

let dbHost = process.env.DB_HOST_DEV || "mongodb://localhost/findfood";

if (env === "production") {
  dbHost = process.env.DB_HOST_PRD || "";
}

mongoose.connect(dbHost, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "❌ connection error: "));
db.once("open", () => {
  console.log("✅ Success to be connected to mongodb://localhost/*********");
});
