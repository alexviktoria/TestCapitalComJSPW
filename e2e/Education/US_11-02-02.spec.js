const { test } = require("@playwright/test");
const { Header } = require("../../pages/header");
const { LoginPage } = require("../../pages/login");
const { SignUpPage } = require("../../pages/signup");
const { AllButtons } = require("../../pages/buttons");
const { Pretest } = require("../../pages/pretest");

let header;
let page;
let buttons;
let signup;
let login;
let pretest;
const language = "es";

function getRandomElements(array, count) {
    const randomized = array.slice();
    for (let i = randomized.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
    }
    return randomized.slice(0, count);
}

test.describe("US_11-02-02_Education > Menu item [Shares trading] on UnReg Role", () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        pretest = new Pretest(page, header, login);
        await test.step("Pretest for UnReg Role", async () => {
            await pretest.pretest_UnReg_Role();
        });
        await header.clickSharesTrading()
    });

    test(`TC_11.02.02_01_UnReg  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
        buttons = new AllButtons(page);
        signup = new SignUpPage(page);
        const fs = require('fs');
        await buttons.clickStartTradingBtnOnMainBanner();
        await signup.signUpFormIsVisible();
        console.log(`Testing the first level on the main page is completed successfully `);
        await test.step("Checking for links in sidebar items", async () => {
            // await page.waitForTimeout(10000);
            const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
            if (links.length === 0) {
                console.log("There are no links on this page and testing of the second level is impossible");
            } else {
                console.log("links", links);
            }
            // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
            fs.writeFileSync('links.txt', links.join('\n'));
            const fileContent = fs.readFileSync('links.txt', 'utf-8');
            const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
            const randomLinks = await getRandomElements(linksFromFile, 3);
            for (let i = 0; i < randomLinks.length; i++) {
                await test.step("Accidental redirection to the page from the sidebar items", async () => {
                    await page.goto(randomLinks[i]);
                    await buttons.clickStartTradingBtnOnMainBanner();
                    await signup.signUpFormIsVisible();

                    if (links.includes(randomLinks[i])) {
                        console.log(`Testing on the '${randomLinks[i]}' link was successfully completed`);
                    } else {
                        console.log(`Testing on the '${randomLinks[i]}' link was failed`);
                    }
                });
            }
        });
    });

    test(`TC_11.02.02_02_UnReg  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
        buttons = new AllButtons(page);
        signup = new SignUpPage(page);
        const fs = require('fs');
        await buttons.clickTryDemoBtnOnMainBanner();
        await signup.signUpFormIsVisible();
        console.log(`Testing the first level on the main page is completed successfully `);
        // await page.waitForTimeout(10000);
        await test.step("Checking for links in sidebar items", async () => {
            const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
            if (links.length === 0) {
                console.log("There are no links on this page and testing of the second level is impossible");
            } else {
                console.log("links", links);
            }
            // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
            fs.writeFileSync('links.txt', links.join('\n'));
            const fileContent = fs.readFileSync('links.txt', 'utf-8');
            const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
            const randomLinks = await getRandomElements(linksFromFile, 3);
            for (let i = 0; i < randomLinks.length; i++) {
                await test.step("Accidental redirection to the page from the sidebar", async () => {
                    await page.goto(randomLinks[i]);
                    await buttons.clickTryDemoBtnOnMainBanner();
                    await signup.signUpFormIsVisible();
                    if (links.includes(randomLinks[i])) {
                        console.log(`Testing on the '${randomLinks[i]}' link was successfully completed`);
                    } else {
                        console.log(`Testing on the '${randomLinks[i]}' link was failed`);
                    }
                });
            };
        })
    });
});

test.describe("US_11-02-02_Education > Menu item [Shares trading] on UnAuth Role", () => {

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        pretest = new Pretest(page, header, login);
        await test.step("Pretest for UnAuth Role", async () => {
            await pretest.pretest_UnAuth_Role();
        });
        await header.clickSharesTrading();
    });

    test(`TC_11.02.02_01_UnAuth  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
        buttons = new AllButtons(page);
        login = new LoginPage(page);
        const fs = require('fs');
        await buttons.clickStartTradingBtnOnMainBanner();
        await login.LoginFormIsVisible();
        console.log(`Testing the first level on the main page is completed successfully `);
        await test.step("Checking for links in sidebar items", async () => {
            // await page.waitForTimeout(10000);
            const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
            if (links.length === 0) {
                console.log("There are no links on this page and testing of the second level is impossible");
            } else {
                console.log("links", links);
            }
            // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
            fs.writeFileSync('links.txt', links.join('\n'));
            const fileContent = fs.readFileSync('links.txt', 'utf-8');
            const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
            const randomLinks = await getRandomElements(linksFromFile, 3);
            for (let i = 0; i < randomLinks.length; i++) {
                await test.step("Accidental redirection to the page from the sidebar", async () => {
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
        })
    });

    test(`TC_11.02.02_02_UnAuth  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
        buttons = new AllButtons(page);
        login = new LoginPage(page);
        const fs = require('fs');
        await buttons.clickTryDemoBtnOnMainBanner();
        await login.LoginFormIsVisible();
        console.log(`Testing the first level on the main page is completed successfully `);
        // await page.waitForTimeout(10000);
        await test.step("Checking for links in sidebar items", async () => {
            const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
            if (links.length === 0) {
                console.log("There are no links on this page and testing of the second level is impossible");
            } else {
                console.log("links", links);
            }
            // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
            fs.writeFileSync('links.txt', links.join('\n'));
            const fileContent = fs.readFileSync('links.txt', 'utf-8');
            const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
            const randomLinks = await getRandomElements(linksFromFile, 3);
            for (let i = 0; i < randomLinks.length; i++) {
                await test.step("Accidental redirection to the page from the sidebar", async () => {
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
});

test.describe("US_11-02-02_Education > Menu item [Shares Trading] on Auth Role", () => {

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        pretest = new Pretest(page);
        await test.step("Pretest for Auth Role", async () => {
            await pretest.pretest_Auth_Role();
        });
        await header.clickSharesTrading();
    });

    test(`TC_11.02.02_01_Auth  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
        buttons = new AllButtons(page);
        login = new LoginPage(page);
        header = new Header(page);
        const fs = require('fs');
        await buttons.clickStartTradingBtnOnMainBanner();
        await header.pagePlatformLiveIsVisible();
        console.log(`Testing the first level on the main page is completed successfully `);
        await test.step("Checking for links in sidebar items", async () => {
            // await page.waitForTimeout(10000);
            const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
            if (links.length === 0) {
                console.log("There are no links on this page and testing of the second level is impossible");
            } else {
                console.log("links", links);
            }
            // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
            fs.writeFileSync('links.txt', links.join('\n'));
            const fileContent = fs.readFileSync('links.txt', 'utf-8');
            const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
            const randomLinks = await getRandomElements(linksFromFile, 3);
            for (let i = 0; i < randomLinks.length; i++) {
                await test.step("Accidental redirection to the page from the sidebar", async () => {
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

    test(`TC_11.02.02_02_Auth  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
        buttons = new AllButtons(page);
        login = new LoginPage(page);
        header = new Header(page);
        const fs = require('fs');
        await buttons.clickTryDemoBtnOnMainBanner();
        await header.pagePlatformDemoIsVisible();
        console.log(`Testing the first level on the main page is completed successfully `);
        await test.step("Checking for links in sidebar items", async () => {
            // await page.waitForTimeout(10000);
            const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
            if (links.length === 0) {
                console.log("There are no links on this page and testing of the second level is impossible");
            } else {
                console.log("links", links);
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
})