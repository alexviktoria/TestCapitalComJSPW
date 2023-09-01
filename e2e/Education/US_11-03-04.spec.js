// @ts-nocheck
const { test, expect } = require("@playwright/test");
const { Header } = require("../../POM/header")
const { LoginPage } = require("../../POM/login")
const { SignUpPage } = require("../../POM/signup")
const { BannerBtn } = require("../../POM/bannerButtons")
// import { MyReporter } from "../../my-awesome-reporter";


let header;
let page;
let bannerBtn;
let signup;
let login;

// test.runWith({
//     reporter: new MyReporter(),
//   });

const testData = {
    email: "alexviktoria1609@gmail.com",
    password: "Av-123456789",
}

const language = "العَرَبِيَّة"
const country = "United Arab Emirates";

test.describe("US_11-03-04_Education > Menu item [Position Trading]  on UnReg Role", () => {
    // test.use({ locale: 'en-GB' });
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        // myreporter = new MyReporter();
        // open capital.com
        await page.goto("/");
        //accept all Cookies
        await header.clickAcceptAllCookies();
        // select country and language
        await header.hoverCountryAndLang();
        await header.clickDropdownCountry()
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
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickDownloadOnAppStoreBtn();
        await page.waitForNavigation();
        await page.waitForTimeout(3000)
        expect(await bannerBtn.LogoAppStore).toBeVisible();
        expect(await bannerBtn.IconCapital).toBeVisible();
        expect(await bannerBtn.ProductNameOnAppstore).toBeVisible();
        expect(await bannerBtn.LinkCapitalComOnAppstore).toBeVisible();
        await page.waitForTimeout(1000);
        await page.goBack();
    })

    test(`TC_11.03.04_05_UnReg  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickDownloadOnGooglePlayLink();
        expect(await bannerBtn.LogoGooglePlay).toBeVisible();
        expect(await bannerBtn.ProdactNameOnGoogleplay).toHaveText(/Online Broker - Capital.com/);
        expect(await bannerBtn.LinkCapitalComOnGoogleplay).toBeVisible();
        await page.waitForTimeout(3000);
        await page.goBack();

    })

    test(`TC_11.03.04_06_UnReg  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        signup = new SignUpPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickExploreWebPlatformLink();
        // await page.waitForLoadState('load');
        await page.waitForNavigation();
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
        // await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
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

test.describe("US_11-03-04_Education > Menu item [Position Trading] on UnAuth Role", () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        login = new LoginPage(page);
        // open capital.com
        await page.goto("/");
        // user unauthorization
        await login.clickBtnLogIn();
        await login.validLogin(testData.email, testData.password);
        // await login.ContinueButton.waitFor();
        await login.ContinueButton.click();
        await page.waitForLoadState('networkidle');
        await page.goBack();
        await page.waitForLoadState('networkidle');
        await login.logoutUser();
        // select country and language
        await header.hoverCountryAndLang();
        await header.clickDropdownCountry();
        await header.clickGetCountry();
        await header.hoverCountryAndLang(); ''
        await header.clickGetLanguage();

    });

    test(`TC_11.03.04_01_UnAuth  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        login = new LoginPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickStartTradingBtnOnMainBanner();
        await login.FormLoginBeVisible()
        await expect(login.HeaderNameLogIn).toBeVisible();
        expect(await login.UserName).toHaveAttribute("type", "email");
        expect(await login.Password).toHaveAttribute("type", "password");
        expect(await login.LogMeAfter).toBeChecked();
        await expect(login.ForgotPasswordLink).toBeVisible();
        await expect(login.ContinueButton).toBeVisible();
        await expect(login.SignUpLinkForm).toBeVisible();
        await login.CloseLoginFormBtn.click();
    })

    test(`TC_11.03.04_02_UnAuth  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        login = new LoginPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickTryDemoBtnOnMainBanner();
        await login.FormLoginBeVisible()
        await expect(login.HeaderNameLogIn).toBeVisible();
        expect(await login.UserName).toHaveAttribute("type", "email");
        expect(await login.Password).toHaveAttribute("type", "password");
        expect(await login.LogMeAfter).toBeChecked();
        await expect(login.ForgotPasswordLink).toBeVisible();
        await expect(login.ContinueButton).toBeVisible();
        await expect(login.SignUpLinkForm).toBeVisible();
        await login.CloseLoginFormBtn.click();
    });

    test(`TC_11.03.04_03_UnAuth  > Test buttons [Trade] on Widget "Most traded" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        login = new LoginPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading();
        await bannerBtn.clickTradeBtnOnWidgetMostTraded();
        expect(await login.FormLoginBeVisible());
        expect(await login.HeaderNameLogIn).toBeVisible();
        expect(await login.UserName).toHaveAttribute("type", "email");
        expect(await login.Password).toHaveAttribute("type", "password");
        expect(await login.LogMeAfter).toBeChecked();
        await expect(login.ForgotPasswordLink).toBeVisible();
        await expect(login.ContinueButton).toBeVisible();
        await expect(login.SignUpLinkForm).toBeVisible();
        await login.CloseLoginFormBtn.click();
    });

    test(`TC_11.03.04_04_UnAuth  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickDownloadOnAppStoreBtn();
        await page.waitForNavigation();
        await page.waitForTimeout(3000)
        expect(await bannerBtn.LogoAppStore).toBeVisible();
        expect(await bannerBtn.IconCapital).toBeVisible();
        expect(await bannerBtn.ProductNameOnAppstore).toBeVisible();
        expect(await bannerBtn.LinkCapitalComOnAppstore).toBeVisible();
        await page.waitForTimeout(1000);
        await page.goBack();
    });

    test(`TC_11.03.04_05_UnAuth  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickDownloadOnGooglePlayLink();
        expect(await bannerBtn.LogoGooglePlay).toBeVisible();
        expect(await bannerBtn.ProdactNameOnGoogleplay).toHaveText(/Online Broker - Capital.com/);
        expect(await bannerBtn.LinkCapitalComOnGoogleplay).toBeVisible();
        await page.waitForTimeout(3000);
        await page.goBack();
    });

    test(`TC_11.03.04_06_UnAuth  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        login = new LoginPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading();
        await bannerBtn.clickExploreWebPlatformLink();
        await page.waitForTimeout(10000);
        expect(await login.FormLoginOnPlatformBeVisible());
        await expect(login.HeaderNameLoginOnPlatform).toBeVisible();
        expect(await login.SignUpLinkFormOnPlatform).toBeVisible();
        expect(await login.EmailOnPlatform).toHaveAttribute("type", "email");
        expect(await login.PasswordOnPlatform).toHaveAttribute("type", "password");
        expect(await login.BtnContinueOnPlatform).toBeVisible();
        await page.goBack();
    });

    test(`TC_11.03.04_07_UnAuth  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        login = new LoginPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading();
        await bannerBtn.clickCreateAndVerifyBtn();
        await page.waitForTimeout(10000);
        await expect(signup.FormSignUp).toBeVisible();
        await expect(signup.LoginLinkForm).toBeVisible();
        await expect(signup.UserName).toHaveAttribute("type", "email");
        await expect(signup.Password).toHaveAttribute("type", "password");
        await expect(signup.ContinueButton).toBeVisible();
        await expect(signup.TextContinueButton()).toMatch(/Continue/)
        await expect(signup.PolicyLink).toBeVisible();
        await signup.clickCloseSignUpFormBtn();
    });
});

test.describe("US_11-03-04_Education > Menu item [Position Trading] on Auth Role", () => {
    let header;
    let login;
    let page;
    let bannerBtn;
    const testData = {
        email: "alexviktoria1609@gmail.com",
        password: "Av-123456789",
    }
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        header = new Header(page);
        login = new LoginPage(page);
        // open capital.com
        await page.goto("/");
        // user unauthorization
        await login.loginAndContinue(testData.email, testData.password);
        await login.ContinueButton.waitFor();
        await login.ContinueButton.click();
        await page.waitForLoadState('networkidle');
        await page.goBack();
        await page.waitForLoadState('networkidle');
        //  await login.logoutUser();
        // select country and language
        await header.hoverCountryAndLang();
        await header.clickDropdownCountry();
        await header.clickGetCountry();
        await header.hoverCountryAndLang();
        await header.clickGetLanguage();

    });

    test(`TC_11.03.04_01_Auth  > Test button [Start Trading] in Main banner on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        login = new LoginPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickStartTradingBtnOnMainBanner();
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL('https://capital.com/trading/platform/');
        await expect(login.LogoCapitalOnPlatform).toBeVisible();
        await page.goBack();
    });


    test(`TC_11.03.04_02_Auth  > Test button [Try Demo] in Main banner on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        login = new LoginPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickTryDemoBtnOnMainBanner();
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL('https://capital.com/trading/platform/?mode=demo');
        await expect(login.LogoCapitalOnPlatform).toBeVisible();
        // await page.waitForTimeout(3000);
        await page.goBack();
    });

    test(`TC_11.03.04_03_Auth  > Test buttons [Trade] on Widget "Most traded" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        login = new LoginPage(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading();
        await bannerBtn.clickTradeBtnOnWidgetMostTraded();
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL('https://capital.com/trading/platform/charting/');
        await expect(login.LogoCapitalOnPlatform).toBeVisible();
        // await page.waitForTimeout(10000);
        await page.goBack();
    });

    test(`TC_11.03.04_04_Auth  > Test button [Download on the App Store] in the block "Sign up and trade smart today"  on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickDownloadOnAppStoreBtn();
        await page.waitForNavigation();
        await page.waitForTimeout(3000)
        expect(await bannerBtn.LogoAppStore).toBeVisible();
        expect(await bannerBtn.IconCapital).toBeVisible();
        expect(await bannerBtn.ProductNameOnAppstore).toBeVisible();
        expect(await bannerBtn.LinkCapitalComOnAppstore).toBeVisible();
        await page.waitForTimeout(1000);
        await page.goBack();
    });

    test(`TC_11.03.04_05_Auth  > Test button [Get it on Google Play] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickDownloadOnGooglePlayLink();
        expect(await bannerBtn.LogoGooglePlay).toBeVisible();
        expect(await bannerBtn.ProdactNameOnGoogleplay).toHaveText(/Online Broker - Capital.com/);
        expect(await bannerBtn.LinkCapitalComOnGoogleplay).toBeVisible();
        await page.waitForTimeout(3000);
        await page.goBack();
    });

    test(`TC_11.03.04_06_Auth  > Test button [Explore Web Platform] in the block "Sign up and trade smart today" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickExploreWebPlatformLink();
        // await page.waitForLoadState('load');
        // await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        expect(await page).toHaveURL('https://capital.com/trading/platform/');
        await expect(login.LogoCapitalOnPlatform).toBeVisible();
        await page.goBack();
    });

    test(`TC_11.03.04_07_Auth  > Test button [Create & verify your account] in the block "Still looking for a broker you can trust?" on '${language}' language`, async () => {
        bannerBtn = new BannerBtn(page);
        header = new Header(page);
        await header.getEducationMenu.hover();
        await page.waitForLoadState('networkidle');
        await header.clickPositionTrading()
        await bannerBtn.clickCreateAndVerifyBtn();
        // await page.waitForLoadState('load');
        // await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        // await page.waitForURL('https://capital.com/trading/platform/');
        await expect(page).toHaveURL('https://capital.com/trading/platform/');
        await expect(login.LogoCapitalOnPlatform).toBeVisible();
        // await page.waitForTimeout(3000);
        await page.goBack();
    });
})