const { test, expect } = require("@playwright/test");
const { Header } = require("../pages/header");

const testData = {
    email: "alexviktoria1609@gmail.com",
    password: "Av-123456789",
}
class Pretest {
    constructor(page, header, login) {
        this.page = page;
        this.header = header;
        this.login = login;
    }
    async pretest_UnReg_Role() {
        const header = new Header(this.page);
        await test.step("Go to capital.com", async () => {
            await this.page.goto("/");
        });
        await test.step("Accept all cookies", async () => {
            await header.clickAcceptAllCookies();
        });

        await test.step("Select country", async () => {
            await header.hoverCountryAndLang();
            await header.clickDropdownCountry();
        });
        await test.step("Select language", async () => {
            await header.clickGetCountry();
            await header.hoverCountryAndLang();
            await header.clickGetLanguage();
        });
    }

    async pretestUnAuthRole() {
        await this.page.goto("/");
        // user unauthorization
        await this.login.clickBtnLogIn();
        await this.login.loginAndContinue(testData.email, testData.password);
        // await login.ContinueButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.goBack();
        await this.page.waitForLoadState('networkidle');
        await this.login.logoutUser();
        // select country and language
        await this.header.hoverCountryAndLang();
        await this.header.clickDropdownCountry()
        await this.header.clickGetCountry();
        await this.header.hoverCountryAndLang();
        await this.header.clickGetLanguage();
    }
}

module.exports = { Pretest };
