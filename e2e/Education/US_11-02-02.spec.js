// @ts-check
import { test } from '@playwright/test';
import { Header } from '../../pages/header';
import { LoginPage } from '../../pages/login';
import { SignUpPage } from '../../pages/signup';
import { AllButtons } from '../../pages/buttons';
import { Pretest } from '../../pages/Pretest';
import fs from 'fs';

let header;
let buttons;
let signup;
let login;
let pretest;

const language = 'en';
const country = 'Australia';
const license = 'ASIC';

function getRandomElements(array, count) {
  const randomized = array.slice();
  for (let i = randomized.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
  }
  return randomized.slice(0, count);
}

test.describe('US_11-02-02_Education > Menu item [Shares trading] on UnReg Role', () => {
  let context;
  let page;
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    header = new Header(page);
    pretest = new Pretest(page, header, login);
    await test.step('Pretest for UnReg Role', async () => {
      await pretest.pretestUnRegRole();
    });
    await header.clickSharesTrading();
  });

  test.afterEach(async () => {
    // Close the current page (window) after each test
    await page.close();
  });

  function performTest(testName, buttonClickFunction, level) {
    test(testName, async () => {
      buttons = new AllButtons(page);
      signup = new SignUpPage(page);

      async function performFunc () {
        await buttonClickFunction();
        // const result2 = await buttonClickFunction();
        // console.log(result2);
        await signup.signUpFormIsVisible(page);
      }

      if (level === 1) {  // first level
        await performFunc();
        console.log(`Testing the first level on the main page is completed successfully`);
      } else {  //second level
        await test.step('Checking for links in sidebar items', async () => {
          const linksLocator = page.locator('a[data-type="sidebar_deeplink"]');
          const links = await linksLocator.all();  // Convert Locator to an array
          links.length === 0
            ? console.log('There are no links on this page and testing of the second level is impossible')
            : console.log('links', links);
          const randomLinks = getRandomElements(links, 3);

          for (const randomLink of randomLinks) {
            await test.step('Accidental redirection to the page from the sidebar', async () => {
              const randomLinkHref = await randomLink.getAttribute('href');
              await page.goto(`${randomLinkHref}`);
              await page.waitForURL(`${randomLinkHref}`);

              await performFunc();

              links.includes(randomLink)
                ? console.log(`Testing on the '${randomLinkHref}' link was successfully completed`)
                : console.log(`Testing on the '${randomLinkHref}' link was failed`);
            });
          }
        });
      }
    });
  }

  performTest(
    `TC_11.02.02_01_UnReg > Test button [Start Trading] in Main banner on ${language} language`,
    () => buttons.clickStartTradingBtnOnMainBanner(),
    1
  );
  performTest(
    `TC_11.02.02_02_UnReg > Test button [Try Demo] in Main banner on ${language} language`,
    () => buttons.clickTryDemoBtnOnMainBanner(),
    1
  );
  performTest(
    `TC_11.02.02_03_UnReg > Test button [Sell] in the Banner [Trading Instrument] on ${language} language`,
    () => buttons.clickSellBtnOnBanner(),
    2
  );
  performTest(
    `TC_11.02.02_04_UnReg > Test button [Buy] in the Banner [Trading Instrument] on ${language} language`,
    () => buttons.clickBuyBtnOnBanner(),
    2
  );
  performTest(
    `TC_11.02.02_05_UnReg > Test button [Start Trading] in the Content block on ${language} language`,
    () => {
      language !== 'en' || language !== 'de' || language !== 'es' || language !== 'it'
        ? buttons.clickContentBlockStartTradingBtn()
        : null;
    },
    1,
  );



  test.afterAll(async () => {
    // Close the browser after all tests
    await context.close();
  });
});

test.describe('US_11-02-02_Education > Menu item [Shares trading] on UnAuth Role', () => {
  let page;
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    header = new Header(page);
    pretest = new Pretest(page, header, login);
    await test.step('Pretest for UnAuth Role', async () => {
      await pretest.pretestUnAuthRole();
    });
    await header.clickSharesTrading();
  });

  test(`TC_11.02.02_01_UnAuth  > Test button [Start Trading] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);

    await buttons.clickStartTradingBtnOnMainBanner();
    await login.LoginFormIsVisible();
    console.log(`Testing the first level on the main page is completed successfully `);
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
      } else {
        console.log('links', links);
      }
      // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          await buttons.clickStartTradingBtnOnMainBanner();
          await login.LoginFormIsVisible();
          if (links.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed`);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });

  test(`TC_11.02.02_02_UnAuth  > Test button [Try Demo] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);

    await buttons.clickTryDemoBtnOnMainBanner();
    await login.LoginFormIsVisible();
    console.log(`Testing the first level on the main page is completed successfully `);
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
      } else {
        console.log('links', links);
      }
      // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          await buttons.clickTryDemoBtnOnMainBanner();
          await login.LoginFormIsVisible();
          if (links.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed`);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });

  test(`TC_11.02.02_03_UnAuth  > Test button [Sell] in the Banner [Trading Instrument] on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);

    if (country === 'United Kingdom') {
      console.log('Testing is not available on the FCA license');
      test.skip();
    }
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
        test.skip();
      } else {
        console.log('links', links);
      }
      // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          if (await buttons.SellBtnOnBanner.isVisible()) {
            await buttons.clickSellBtnOnBanner();
            await login.LoginFormIsVisible();
          } else {
            console.log(`For test on '${randomLinks[i]}' link the button [Sell] doen't displayed`);
            return;
          }

          if (randomLinks.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed `);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });

  test(`TC_11.02.02_04_UnAuth  > Test button [Buy] in the Banner [Trading Instrument] on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);

    if (country === 'United Kingdom') {
      console.log('Testing is not available on the FCA license');
      test.skip();
    }
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
        test.skip();
      } else {
        console.log('links', links);
      }
      // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          if (await buttons.BuyBtnOnBanner.isVisible()) {
            await buttons.clickBuyBtnOnBanner();
            await login.LoginFormIsVisible();
          } else {
            console.log(`For test on '${randomLinks[i]}' link the button [Buy] doen't displayed`);
            return;
          }

          if (randomLinks.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed `);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });

  test(`TC_11.02.02_05_UnAuth  > Test button [Start Trading] in the Content block on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);

    if (language !== 'en' && language !== 'de' && language !== 'es' && language !== 'it') {
      console.log('Testing is not available for this language');
      test.skip();
    }
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
        test.skip();
      } else {
        console.log('links', links);
      }
      // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          if (await buttons.contetntBlockStartTradingBtn.isVisible()) {
            await buttons.clickContentBlockStartTradingBtn();
            await login.LoginFormIsVisible();
          } else {
            console.log(`For test on '${randomLinks[i]}' link the button [Start Trading] doen't displayed`);
            return;
          }

          if (randomLinks.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed `);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });
});

test.describe('US_11-02-02_Education > Menu item [Shares Trading] on Auth Role', () => {
  let page;
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    header = new Header(page);
    pretest = new Pretest(page);
    await test.step('Pretest for Auth Role', async () => {
      await pretest.pretest_Auth_Role();
    });
    await header.clickSharesTrading();
  });

  test(`TC_11.02.02_01_Auth  > Test button [Start Trading] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);

    await buttons.clickStartTradingBtnOnMainBanner();
    await header.pagePlatformLiveIsVisible();
    console.log(`Testing the first level on the main page is completed successfully `);
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
      } else {
        console.log('links', links);
      }
      // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          await buttons.clickStartTradingBtnOnMainBanner();
          await header.pagePlatformLiveIsVisible();

          if (links.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed`);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });

  test(`TC_11.02.02_02_Auth  > Test button [Try Demo] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);

    await buttons.clickTryDemoBtnOnMainBanner();
    await header.pagePlatformDemoIsVisible();
    console.log(`Testing the first level on the main page is completed successfully `);
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
      } else {
        console.log('links', links);
      }
      // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await page.goto(randomLinks[i]);
        await buttons.clickTryDemoBtnOnMainBanner();
        await header.pagePlatformDemoIsVisible();

        if (links.includes(randomLinks[i])) {
          console.log(`Testing on the '${randomLinks[i]}' link was successfully completed`);
        } else {
          console.log(`Testing on the '${randomLinks[i]}' link was failed`);
        }
      }
    });
  });

  test(`TC_11.02.02_03_Auth  > Test button [Sell] in the Banner [Trading Instrument] on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);

    if (country === 'United Kingdom') {
      console.log('Testing is not available on the FCA license');
      test.skip();
    }
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
        test.skip();
      } else {
        console.log('links', links);
      }
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          if (await buttons.SellBtnOnBanner.isVisible()) {
            await buttons.clickSellBtnOnBanner();
            await header.pagePlatformLiveIsVisible();
          } else {
            console.log(`For test on '${randomLinks[i]}' link the button [Sell] doen't displayed`);
            return;
          }

          if (randomLinks.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed `);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });

  test(`TC_11.02.02_04_Auth  > Test button [Buy] in the Banner [Trading Instrument] on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);

    if (country === 'United Kingdom') {
      console.log('Testing is not available on the FCA license');
      test.skip();
    }
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
        test.skip();
      } else {
        console.log('links', links);
      }
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          if (await buttons.BuyBtnOnBanner.isVisible()) {
            await buttons.clickBuyBtnOnBanner();
            await header.pagePlatformLiveIsVisible();
          } else {
            console.log(`For test on '${randomLinks[i]}' link the button [Buy] doen't displayed`);
            return;
          }

          if (randomLinks.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed `);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });

  test(`TC_11.02.02_05_Auth  > Test button [Start Trading] in the Content block on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);

    if (language !== 'en' && language !== 'de' && language !== 'es' && language !== 'it') {
      console.log('Testing is not available for this language');
      test.skip();
    }
    await test.step('Checking for links in sidebar items', async () => {
      // await page.waitForTimeout(10000);
      const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
      if (links.length === 0) {
        console.log('There are no links on this page and testing of the second level is impossible');
        test.skip();
      } else {
        console.log('links', links);
      }
      // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
      fs.writeFileSync('links.txt', links.join('\n'));
      const fileContent = fs.readFileSync('links.txt', 'utf-8');
      const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
      const randomLinks = await getRandomElements(linksFromFile, 3);
      for (let i = 0; i < randomLinks.length; i++) {
        await test.step('Accidental redirection to the page from the sidebar', async () => {
          await page.goto(randomLinks[i]);
          if (await buttons.contetntBlockStartTradingBtn.isVisible()) {
            await buttons.clickContentBlockStartTradingBtn();
            await header.pagePlatformLiveIsVisible();
          } else {
            console.log(`For test on '${randomLinks[i]}' link the button [Start Trading] doen't displayed`);
            return;
          }

          if (randomLinks.includes(randomLinks[i])) {
            console.log(`Testing on the '${randomLinks[i]}' link was successfully completed `);
          } else {
            console.log(`Testing on the '${randomLinks[i]}' link was failed`);
          }
        });
      }
    });
  });
});
