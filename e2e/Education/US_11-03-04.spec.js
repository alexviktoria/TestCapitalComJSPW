// @ts-check
const { test, expect } = require("@playwright/test");
const { Header } = require("../../POM/header")
const { LoginPage } = require("../../POM/login")
const { SignUpPage } = require("../../POM/signup")
const { BannerBtn } = require("../../POM/bannerButtons")

let header;
let page;
let bannerBtn;
let signup;
let login;

const testData = {
    email: "alexviktoria1609@gmail.com",
    password: "Av-123456789",
}

const language = "English"
const country = "United Kingdom";

test.describe("US_11-03-04_Education > Menu item [Position Trading]  on UnReg Role", () => {

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        // open capital.com
        await page.goto("/");
        //accept all Cookies
        await header.clickAcceptAllCookies();
        // select country and language
        await header.hoverCountryAndLang();
        await header.clickDropdownCountry();
        await header.clickGetCountry();
        await header.hoverCountryAndLang();
        await header.clickGetLanguage();
    });

    test(`TC_11.03.04_01_UnReg  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickStartTradingBtnOnMainBanner();
        expect(await signup.FormSignUp).toBeVisible();
        expect(await signup.LoginLinkForm).toBeVisible();
        expect(await signup.UserName).toHaveAttribute("type", "email");
        expect(await signup.Password).toHaveAttribute("type", "password");
        expect(await signup.ContinueButton).toBeVisible();
        expect(await signup.TextContinueButton()).toMatch(/Continue/)
        expect(await signup.PolicyLink).toBeVisible();
        await signup.clickCloseSignUpFormBtn();
    });

    test(`TC_11.03.04_02_UnReg  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickTryDemoBtnOnMainBanner()
        expect(await signup.FormSignUp).toBeVisible();
        expect(await signup.LoginLinkForm).toBeVisible();
        expect(await signup.UserName).toHaveAttribute("type", "email");
        expect(await signup.Password).toHaveAttribute("type", "password");
        expect(await signup.ContinueButton).toBeVisible();
        expect(await signup.TextContinueButton()).toMatch(/Continue/)
        expect(await signup.PolicyLink).toBeVisible();
        await signup.clickCloseSignUpFormBtn();
    });

    test(`TC_11.03.04_03_UnReg  > Test buttons [Trade] on Widget "Most traded" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await page.waitForLoadState('networkidle');
        await bannerBtn.clickTradeBtnOnWidgetMostTraded();
        // await page.waitForTimeout(3000);
        expect(await signup.FormSignUp).toBeVisible();
        expect(await signup.LoginLinkForm).toBeVisible();
        expect(await signup.UserName).toHaveAttribute("type", "email");
        expect(await signup.Password).toHaveAttribute("type", "password");
        expect(await signup.ContinueButton).toBeVisible();
        expect(await signup.TextContinueButton()).toMatch(/Continue/)
        expect(await signup.PolicyLink).toBeVisible();
        await signup.clickCloseSignUpFormBtn();
    });

    test(`TC_11.03.04_04_UnReg  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickDownloadOnAppStoreBtn();
        // await page.waitForLoadState('networkidle');
        await page.waitForLoadState('load')
        expect(await bannerBtn.LogoAppStore).toBeVisible();
        expect(await bannerBtn.IconCapital).toBeVisible();
        expect(await bannerBtn.ProductNameOnAppstore).toBeVisible();
        expect(await bannerBtn.LinkCapitalComOnAppstore).toBeVisible();
        await page.goBack();
    })

    test(`TC_11.03.04_05_UnReg  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickDownloadOnGooglePlayLink();
        await page.waitForLoadState('load')
        expect(await bannerBtn.LogoGooglePlay).toBeVisible();
        expect(await bannerBtn.ProdactNameOnGoogleplay).toHaveText(/Online Broker - Capital.com/);
        expect(await bannerBtn.LinkCapitalComOnGoogleplay).toBeVisible();
        await page.waitForTimeout(3000);
        await page.goBack();

    })

    test.only(`TC_11.03.04_06_UnReg  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickExploreWebPlatformLink();
        await page.waitForLoadState('load');
        // await page.waitForNavigation()
        expect(await signup.FormSignUpOnPaltform).toBeVisible();
        expect(await signup.LoginLinkFormOnPlatform).toBeVisible();
        expect(await signup.EmailOnPlatform).toHaveAttribute("type", "email");
        expect(await signup.PasswordOnPlatform).toHaveAttribute("type", "password");
        expect(await signup.ContinueButton).toBeVisible();
        expect(await signup.ContinueButtonOnPlatform).toHaveText(/Continue/);
        expect(await signup.CloseSignUpFormOnPlatform).toBeVisible();
        await page.waitForLoadState('networkidle');
        await page.goBack();
    });

    test(`TC_11.03.04_07_UnReg  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickCreateAndVerifyBtn();
        await page.waitForLoadState('networkidle');
        // await page.waitForTimeout(5000);
        await expect(signup.FormSignUp).toBeVisible();
        expect(await signup.LoginLinkForm).toBeVisible();
        expect(await signup.UserName).toHaveAttribute("type", "email");
        expect(await signup.Password).toHaveAttribute("type", "password");
        expect(await signup.ContinueButton).toBeVisible();
        expect(await signup.TextContinueButton()).toMatch(/Continue/)
        expect(await signup.PolicyLink).toBeVisible();
        await signup.clickCloseSignUpFormBtn();
    });
});