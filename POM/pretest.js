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
    async pretestUnRegRole() {
        await this.page.goto("/");
        //accept all Cookies
        await this.header.clickAcceptAllCookies();
        // select country and language
        await this.header.hoverCountryAndLang();
        await this.header.clickDropdownCountry()
        await this.header.clickGetCountry();
        await this.header.hoverCountryAndLang();
        await this.header.clickGetLanguage();
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
