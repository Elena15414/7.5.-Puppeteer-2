const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("let's go to the cinema tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

   test("The first test'", async () => {
    const title = await page.title();
    //await clickElement("page-header");
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('ИдёмВКино');
  }, 70000);

    test("The first link text 'Красивый зал'", async () => {
    const actual = await getText(page, ".movie-seances__hall-title");
    expect(actual).toContain("Красивый зал");
  }), 70000;

  test("Treservation for 18 00", async () => {
   const btnSelector = ".movie-seances__time";
   await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await getText(page, ".movie-seances__time");
    expect(actual).toContain("11:00")
  }), 70000;

  });