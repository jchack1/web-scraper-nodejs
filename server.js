const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Question = require("./models/Question");
const questions = require("./questions.json");
require("dotenv").config();

const main = async () => {
  app.use(bodyParser.json());

  //setup of db
  await mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Error connecting to mongoose"));
  db.once("open", function () {
    console.log("Connected to the database");
  });

  for (const question of questions) {
    const newQuestion = new Question({
      question: question.question,
      answer: question.answer,
    });
    //add to database
    newQuestion.save(function (err) {
      if (err) {
        return console.error(`save error: ${err}`);
      }
    });
  }

  console.log("done");
};

main();
