const puppeteer = require("puppeteer");
const fs = require("fs");

const scraper = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://30secondsofinterviews.org/", {
      waitUntil: "domcontentloaded",
    });

    const questions = await page.$$eval(".Question", (elements) =>
      elements.map((e) => {
        if (
          e.querySelector(".Question__heading h2") == null ||
          e.querySelector(".Question__answer") == null
        )
          return;

        return {
          question: e.querySelector(".Question__heading").innerHTML,
          answer: e.querySelector(".Question__answer").innerHTML,
        };
      })
    );

    fs.writeFile("questions3.json", JSON.stringify(questions), (err) => {
      if (err) throw err;
      console.log("Complete");
    });

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};

scraper();
