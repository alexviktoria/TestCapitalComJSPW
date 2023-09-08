const { test, expect } = require("@playwright/test");
const { Header } = require("../../POM/header");
const { SignUpPage } = require("../../POM/signup")
const { LoginPage } = require("../../POM/login");
const { BannerBtn } = require("../../POM/bannerButtons")
const { Pretest } = require("../../POM/pretest")
const { linksSaveToFile } = require("../../POM/linksFile")

let header;
let page;
let signup;
let login;
let bannerBtn;
let pretest;
const language = "pl";


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
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickSharesTrading();
        await bannerBtn.clickStartTradingBtnOnMainBanner();
        await signup.signUpFormIsVisible();
        await signup.clickCloseSignUpFormBtn()
        console.log(`Testing the first level on the main page is completed successfully `);
        await page.waitForTimeout(10000);
        await linksSaveToFile(page, bannerBtn, signup);
        
    })
})