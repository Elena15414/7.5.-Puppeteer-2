const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(70000);
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("let's go to the cinema tests", () => {

   test("The first test'", async () => {
    const title = await page.title();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('ИдёмВКино');
  }, 70000);

    test("The first link text Зал 1", async () => {
    const actual = await getText(page, ".movie-seances__hall-title");
    expect(actual).toContain("Зал 1");
  }, 70000);

  test("Treservation for 00:00", async () => {
   const btnSelector = ".movie-seances__time";
   await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await getText(page, ".movie-seances__time");
    expect(actual).toContain("00:00")
  },70000);

});

describe("reservation cinema tests", () => {
 
   test ("Mickey Mouse positive", async() =>{ 
    await clickElement(page, ".page-nav__day:last-child");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a"); 
    await clickElement(page, ".buying-scheme__chair_standart");
    await page.click(".acceptin-button", {
      visible: true,
    });
    const actual = await getText(page, ".acceptin-button");
    expect(actual).toContain("Получить код бронирования");
  }, 70000);

    test ("Mickey Mouse negative", async() =>{
    await clickElement(page, ".page-nav__day:last-child");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a");
    await clickElement(page, ".buying-scheme__chair_selected");
    await page.click(".acceptin-button");
    await page.click(".acceptin-button", {
      visible: false,
    });
    const actual = await getText(page, ".acceptin-button");
    expect(actual).toContain("Забронировать");
  }, 75000);
});