import fs from "fs";
import { env } from "../constants/constants";

const errorLoggerDev = fs.createWriteStream("error_development.log", {
  flags: "a",
});

const errorLoggerPrd = fs.createWriteStream("error_production.log", {
  flags: "a",
});

export const writeErrorLogs = (errorMessage: string) => {
  const date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  const datetime =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  const text = `[${datetime}]: ${errorMessage}\r\n`;
  if (env === "production") {
    errorLoggerPrd.write(text);
  } else {
    errorLoggerDev.write(text);
  }
};
