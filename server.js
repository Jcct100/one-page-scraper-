const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

const url = "https://voiceprinciples.com/";

request(url, function(err, response, html) {
  if (!err && response.statusCode == 200) {
    const $ = cheerio.load(html);

    let allTitles = $(
      "article section:not('section:last-child, section:nth-last-child(2)')"
    );

    allTitles.each((i, el) => {
      const title = $(el)
        .find("h3")
        .text()
        .replace(/\s\s+/g, "");

      const allPrinciples = $(el)
        .find("li")
        .text()
        .replace(/\s\s+/g, "");

      writeStream.write(`${title}, ${allPrinciples} \n`);
    });

    console.log("scraping done");
  }
});
