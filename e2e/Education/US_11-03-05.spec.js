// // @ts-nocheck
// const { test, expect } = require("@playwright/test");
// const { Header } = require("../../pages/header");
// const { LoginPage } = require("../../pages/login");
// const { SignUpPage } = require("../../pages/signup");
// const { AllButtons } = require("../../pages/buttons");
// const { Pretest } = require("../../pages/pretest");

// let header;
// let page;
// let buttons;
// let signup;
// let login;
// let pretest

// // const testData = {
// //     email: "alexviktoria1609@gmail.com",
// //     password: "Av-123456789",
// // }

// const language = "en"

// test.describe("US_11-03-05_Education > Menu item [Swing Trading]  on UnReg Role", () => {
//     test.beforeEach(async ({ browser }) => {
//         const context = await browser.newContext("Hidden");
//         page = await context.newPage("Hidden");
//         header = new Header(page);
//         pretest = new Pretest(page, header, login);
//         await test.step("Pretest for UnReg Role", async () => {
//             await pretest.pretest_UnReg_Role();
//         });
//         await header.clickSwingTrading();
//     });

//     test(`TC_11.03.04_01_UnReg  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         signup = new SignUpPage(page);
//         await buttons.clickStartTradingBtnOnMainBanner();
//         await signup.signUpFormIsVisible();
//     });

//     test(`TC_11.03.04_02_UnReg  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         signup = new SignUpPage(page);
//         await buttons.clickTryDemoBtnOnMainBanner();
//         await signup.signUpFormIsVisible();
        
//     });

//     test(`TC_11.03.04_03_UnReg  > Test buttons [Trade] on Widget "Most traded" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         signup = new SignUpPage(page);
//         await buttons.clickTradeBtnOnWidgetMostTraded();
//         await signup.signUpFormIsVisible();
        
//     });


//     test(`TC_11.03.04_04_UnReg  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         await buttons.clickDownloadOnAppStoreBtn();
         
//     })

//     test(`TC_11.03.04_05_UnReg  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         await buttons.clickDownloadOnGooglePlayBtn();

//     })

//     test(`TC_11.03.04_06_UnReg  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         signup = new SignUpPage(page);
//         await buttons.clickExploreWebPlatformBtn();
//         await signup.signUpFormOnPlatformIsVisible();
       
//     });

//     test(`TC_11.03.04_07_UnReg  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         signup = new SignUpPage(page); 
//         await buttons.clickCreateAndVerifyBtn();
//         await signup.signUpFormIsVisible();
       
//     });
// });

// test.describe("US_11-03-04_Education > Menu item [Position Trading] on UnAuth Role", () => {
//     // let header;
//     // let login;
//     // let page;
//     // let buttons;
//     // const testData = {
//     //     email: "alexviktoria1609@gmail.com",
//     //     password: "Av-123456789",
//     // }
//     test.beforeAll(async ({ browser }) => {
//         const context = await browser.newContext();
//         page = await context.newPage();
//         header = new Header(page);
//         pretest = new Pretest(page, header,login);
//         await test.step("Pretest for UnAuth Role", async () => {
//             await pretest.pretest_UnAuth_Role();
//         });
//         await header.clickPositionTrading();

//     });

//     test(`TC_11.03.04_01_UnAuth  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         login = new LoginPage(page);
//         await buttons.clickStartTradingBtnOnMainBanner();
//         await login.LoginFormIsVisible();
       
//     })

//     test(`TC_11.03.04_02_UnAuth  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         login = new LoginPage(page);
//         await buttons.clickTryDemoBtnOnMainBanner();
//         await login.LoginFormIsVisible();
       
//     });

//     test(`TC_11.03.04_03_UnAuth  > Test buttons [Trade] on Widget "Most traded" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         login = new LoginPage(page);
//         await buttons.clickTradeBtnOnWidgetMostTraded();
//         await login.LoginFormIsVisible();
       
//     });

//     test(`TC_11.03.04_04_UnAuth  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         await buttons.clickDownloadOnAppStoreBtn();
        
//     });

//     test(`TC_11.03.04_05_UnAuth  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         await buttons.clickDownloadOnGooglePlayBtn();
//     });

//     test(`TC_11.03.04_06_UnAuth  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         login = new LoginPage(page);
//         await buttons.clickExploreWebPlatformBtn();
//         await login.LoginFormOnPlatformIsVisible();
        
//     });

//     test(`TC_11.03.04_07_UnAuth  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         signup = new SignUpPage(page); 
//         await buttons.clickCreateAndVerifyBtn();
//         await signup.signUpFormIsVisible();
       
//     });
// });

// test.describe("US_11-03-04_Education > Menu item [Position Trading] on Auth Role", () => {
//     // let header;
//     // let login;
//     // let page;
//     // let buttons;
//     // const testData = {
//     //     email: "alexviktoria1609@gmail.com",
//     //     password: "Av-123456789",
//     // }
//     test.beforeAll(async ({ browser }) => {
//         const context = await browser.newContext();
//         page = await context.newPage();
//         header = new Header(page);
//         pretest = new Pretest(page);
//         await test.step("Pretest for Auth Role", async () => {
//             await pretest.pretest_Auth_Role();
//         });
//         await header.clickPositionTrading();
       

//     });

//     test(`TC_11.03.04_01_Auth  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         header = new Header(page);
//         await buttons.clickStartTradingBtnOnMainBanner();
//         await page.waitForTimeout(3000);
//         await header.pagePlatformLiveIsVisible();
//     });


//     test(`TC_11.03.04_02_Auth  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         header = new Header(page);
//         await buttons.clickTryDemoBtnOnMainBanner();
//         await page.waitForTimeout(3000);
//         await header.pagePlatformDemoIsVisible();
//     });

//     test(`TC_11.03.04_03_Auth  > Test buttons [Trade] on Widget "Most traded" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         header = new Header(page);
//         await buttons.clickTradeBtnOnWidgetMostTraded();
//         await page.waitForTimeout(3000);
//         await header.pagePlatformInstrumentIsVisible();
       
//     });

//     test(`TC_11.03.04_04_Auth  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         await buttons.clickDownloadOnAppStoreBtn();
       
//     });

//     test(`TC_11.03.04_05_Auth  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         await buttons.clickDownloadOnGooglePlayBtn();
       
//     });

//     test(`TC_11.03.04_06_Auth  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         header = new Header(page);
//         await buttons.clickExploreWebPlatformLink();
//         await page.waitForTimeout(3000);
//         await header.pagePlatformLiveIsVisible();
       
//     });

//     test(`TC_11.03.04_07_Auth  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language`, async () => {
//         buttons = new AllButtons(page);
//         header = new Header(page);
//         await buttons.clickCreateAndVerifyBtn();
//         await page.waitForTimeout(3000);
//         await header.pagePlatformLiveIsVisible();
//     });
// })