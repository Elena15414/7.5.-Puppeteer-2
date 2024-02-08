const fetch = require("node-fetch");
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");
var {setDefaultTimeout} = require("cucumber");
setDefaultTimeout(60 * 1000);


Before(async function () {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on page1 {string}", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 50000,
  });
});
When("user selects the desired day", async function () {
  return await clickElement(this.page, ".page-nav__day:last-child");
}, 70000);

Then ("user selects the desired movie", async function () {
  return await clickElement (
    this.page,"body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(1) > a");
}, 70000);

Then ("user chooses a location", async function () {
  return await clickElement(this.page, ".buying-scheme__chair_standart");
}, 70000);

Then ("user is booking tickets", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("user confirms the booking {string}", async function (string) {
  const actual = await getText(this.page, ".acceptin-button");
  expect(actual).toContain("Забронировать");
}, 70000);


Given("user is on page2 {string}", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 30000,
  });
});
When("user selects the desired day2", async function () {
  return await clickElement(this.page, ".page-nav__day:last-child");
});
Then ("user selects the desired movie2", async function () {
  return await clickElement(
    this.page,
    "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a"
  );
});
Then ("user selects the occupied place", async function () {
  return await clickElement(this.page, ".buying-scheme__chair_standart");
});
Then ("user has booked tickets", async function () {
  return await clickElement(this.page, ".acceptin-button");
});
Then ("user has confirmed the booking of tickets", async function () {
  return await clickElement(this.page, ".acceptin-button");
});
Then("Get Error {string}", async function (string) {
  const actual = await getText(this.page, ".acceptin-button");
  await expect(actual).contain("Забронировать");
});