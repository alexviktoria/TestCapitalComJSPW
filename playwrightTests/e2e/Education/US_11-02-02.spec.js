const { test, expect } = require("@playwright/test");
const { Header } = require("../../POM/header");
const { SignUpPage } = require("../../POM/signup")
const { LoginPage } = require("../../POM/login");
const { BannerBtn } = require("../../POM/bannerButtons")
const { Pretest } = require("../../POM/pretest")
const { LinksFile } = require("../../POM/linksFile")

let header;
let page;
let signup;
let login;
let bannerBtn;
let pretest;
let linksfile;
const language = "zh";


test.describe("US_11-02-02_Education > Menu item [Shares trading] on UnReg Role", () => {

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        pretest = new Pretest(page, header);
        await pretest.pretestUnRegRole();

    });

    test(`TC_11.02.02_01_UnReg  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        signup = new SignUpPage(page);
        linksfile = new LinksFile(page)
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickSharesTrading();
        await bannerBtn.clickStartTradingBtnOnMainBanner();
        await signup.signUpFormIsVisible()
        console.log(`Testing the first level on the main page is completed successfully `);
        // await page.waitForTimeout(10000);
        // Вызов функции linksSaveToFile_UnReg
        await linksfile.linksSaveToFile_UnReg(page, bannerBtn, signup)
        // Ваши проверки
        for (let i = 0; i < links.length; i++) {
            await page.goto(links[i]);
            await bannerBtn.clickStartTradingBtnOnMainBanner();
            await signup.signUpFormIsVisible();

            if (links.includes(links[i])) {
                console.log(`Testing on the '${links[i]}' link was successfully completed`);
            } else {
                console.log(`Testing on the '${links[i]}' link was failed`);
            }

        }
    });

});

test.describe("US_11-02-02_Education > Menu item [Shares trading] on UnAuth Role", () => {
    // const testData = {
    //   email: "alexviktoria1609@gmail.com",
    //   password: "Av-123456789",
    // }

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        login = new LoginPage(page);
        pretest = new Pretest(page, header, login);
        await pretest.pretestUnAuthRole()
    })

    test(`TC_11.02.02_01_UnAuth  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickSharesTrading();
        await bannerBtn.clickStartTradingBtnOnMainBanner();
        await login.LoginFotmIsVisible();
        console.log(`Testing the first level on the main page is completed successfully `);
        // await page.waitForTimeout(10000);
        await linksSaveToFile_UnAuth(page, bannerBtn, login);

    })
})