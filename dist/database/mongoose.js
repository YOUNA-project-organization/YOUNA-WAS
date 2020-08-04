"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants/constants");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let dbHost = process.env.DB_HOST_DEV || "mongodb://localhost/findfood";
if (constants_1.env === "production") {
    dbHost = process.env.DB_HOST_PRD || "";
}
mongoose_1.default.connect(dbHost, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "❌ connection error: "));
db.once("open", () => {
    console.log("✅ Success to be connected to mongodb://localhost/*********");
});
