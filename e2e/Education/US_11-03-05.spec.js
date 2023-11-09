// @ts-check
import { test } from '@playwright/test';
import { Header } from '../../pages/header';
import { LoginPage } from '../../pages/login';
import { SignUpPage } from '../../pages/signup';
import { AllButtons } from '../../pages/buttons';
import { Pretest } from '../../pages/pretest';

let header;
let page;
let buttons;
let signup;
let login;
let pretest;

const language = 'en';
const license = 'FCA';

test.describe('US_11-03-05_Education > Menu item [Swing Trading]  on UnReg Role', () => {
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    pretest = new Pretest(page, header, login);
    await test.step('Pretest for UnReg Role', async () => {
      await pretest.pretestUnRegRole();
    });
  });

  test(`TC_11.03.05_01_UnReg  > Test button [Start Trading] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    signup = new SignUpPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickStartTradingBtnOnMainBanner();
    await signup.signUpFormIsVisible();
  });

  test(`TC_11.03.05_02_UnReg  > Test button [Try Demo] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    signup = new SignUpPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickTryDemoBtnOnMainBanner();
    await signup.signUpFormIsVisible();
  });

  test(`TC_11.03.05_03_UnReg  > Test buttons [Trade] on Widget "Most traded" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    signup = new SignUpPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickTradeBtnOnWidgetMostTraded();
    await signup.signUpFormIsVisible();
  });

  test(`TC_11.03.05_04_UnReg  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickDownloadOnAppStoreBtn();
  });

  test(`TC_11.03.05_05_UnReg  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickDownloadOnGooglePlayBtn();
  });

  test(`TC_11.03.05_06_UnReg  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    signup = new SignUpPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickExploreWebPlatformBtn();
    await signup.signUpFormOnPlatformIsVisible();
  });

  test(`TC_11.03.05_07_UnReg  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    signup = new SignUpPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickCreateAndVerifyBtn();
    await signup.signUpFormIsVisible();
  });
});

test.describe('US_11-03-05_Education > Menu item [Swing Trading] on UnAuth Role', () => {
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    pretest = new Pretest(page, header, login);
    await test.step('Pretest for UnAuth Role', async () => {
      await pretest.pretestUnAuthRole();
    });
  });

  test(`TC_11.03.05_01_UnAuth  > Test button [Start Trading] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickStartTradingBtnOnMainBanner();
    await login.LoginFormIsVisible();
  });

  test(`TC_11.03.05_02_UnAuth  > Test button [Try Demo] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickTryDemoBtnOnMainBanner();
    await login.LoginFormIsVisible();
  });

  test(`TC_11.03.05_03_UnAuth  > Test buttons [Trade] on Widget "Most traded" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickTradeBtnOnWidgetMostTraded();
    await login.LoginFormIsVisible();
  });

  test(`TC_11.03.05_04_UnAuth  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickDownloadOnAppStoreBtn();
  });

  test(`TC_11.03.05_05_UnAuth  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickDownloadOnGooglePlayBtn();
  });

  test(`TC_11.03.05_06_UnAuth  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    login = new LoginPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickExploreWebPlatformBtn();
    await login.LoginFormOnPlatformIsVisible();
  });

  test(`TC_11.03.05_07_UnAuth  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    signup = new SignUpPage(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickCreateAndVerifyBtn();
    await signup.signUpFormIsVisible();
  });
});

test.describe('US_11-03-05_Education > Menu item [Swing Trading] on Auth Role', () => {
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    pretest = new Pretest(page);
    await test.step('Pretest for Auth Role', async () => {
      await pretest.pretest_Auth_Role();
    });
  });

  test(`TC_11.03.05_01_Auth  > Test button [Start Trading] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickStartTradingBtnOnMainBanner();
    await header.pagePlatformLiveIsVisible();
  });

  test(`TC_11.03.05_02_Auth  > Test button [Try Demo] in Main banner on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickTryDemoBtnOnMainBanner();
    await header.pagePlatformDemoIsVisible();
  });

  test(`TC_11.03.05_03_Auth  > Test buttons [Trade] on Widget "Most traded" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickTradeBtnOnWidgetMostTraded();
    await header.pagePlatformInstrumentIsVisible();
  });

  test(`TC_11.03.05_04_Auth  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickDownloadOnAppStoreBtn();
  });

  test(`TC_11.03.05_05_Auth  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickDownloadOnGooglePlayBtn();
  });

  test(`TC_11.03.05_06_Auth  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickExploreWebPlatformBtn();
    await header.pagePlatformLiveIsVisible();
  });

  test(`TC_11.03.05_07_Auth  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language and '${license}' license`, async () => {
    buttons = new AllButtons(page);
    header = new Header(page);
    header = new Header(page);
    await header.clickSwingTrading();
    await buttons.clickCreateAndVerifyBtn();
    await header.pagePlatformLiveIsVisible();
  });
});
