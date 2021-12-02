const puppeteer = require("puppeteer");
const commands = require("./commands.js");
let PAGE, BROWSER;

main();

async function main() {
  await createBrowser();
  const commandArray = commands.commandArray;
  for (let i = 0; i < commandArray.length; i++) {
    console.log(`${commandArray[i][0]},${commandArray[i][1]}`);
    await issueCommand(commandArray[i][0], commandArray[i][1]);
  }
  // commandArray.forEach(async (commandPair) => {
  //   console.log(`${commandPair[0]},${commandPair[1]}`);
  //   await issueCommand(commandPair[0], commandPair[1]);
  // });
  // await issueCommand(commands.Command1, "1");
  // await BROWSER.close();
}

async function createBrowser() {
  BROWSER = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1600,
      height: 1080,
    },
  });
  PAGE = await BROWSER.newPage();
  await PAGE.goto("http://localhost:8080/project4/client.jsp");
}

async function issueCommand(command, identifier) {
  await PAGE.type("#inputField", command);

  // await PAGE.screenshot({
  //   path: `./ss/Before-${identifier}.png`,
  //   fullPage: true,
  // });
  await Promise.all([PAGE.click("#executeButton"), PAGE.waitForNavigation()]);
  await PAGE.screenshot({
    path: `./screenshots/${identifier}.png`,
    fullPage: true,
  });
  await PAGE.click("#resetButton");
}
