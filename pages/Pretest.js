import { test } from '@playwright/test';

// TODO ! ↓↓ delete ↓↓
const testData = {
  email: 'alexviktoria1609@gmail.com',
  password: 'Av-123456789',
};

class Pretest {
  constructor(page, header, login) {
    this.page = page;
    this.header = header;
    this.login = login;
  }
  async pretestUnRegRole() {
    await this.goToMainPage();
    await this.acceptAllCookies();
    await this.selectCountryAndLanguage();
  }

  async pretestUnAuthRole() {    // user unauthorization
    await this.goToMainPage();
    await this.acceptAllCookies(); // TODO check step
    await this.loginUser();
    await this.logoutUser();
    await this.selectCountryAndLanguage();
  }

  async pretest_Auth_Role() {    // user unauthorization
    await this.goToMainPage();
    await this.acceptAllCookies(); // TODO check step
    await this.loginUser();
    await this.selectCountryAndLanguage();
  }

  async goToMainPage() {
    await test.step('Go to capital.com', async () => {
      await this.page.goto('/');
    });
  }

  async acceptAllCookies() {
    await test.step('Accept all cookies', async () => {
      await this.header.clickAcceptAllCookies();
    });
  }

  async selectCountryAndLanguage() {
    await test.step('Select country ', async () => {
      await this.header.hoverCountryAndLang();
      await this.header.clickDropdownCountry();
      await this.header.clickGetCountry();
    });

    await test.step('Select language', async () => {
      await this.header.hoverCountryAndLang();
      await this.header.clickGetLanguage();
    });
  }

  async loginUser() {
    await test.step("Click 'Login' button", async () => {
      await this.login.clickBtnLogIn();
    });
    await test.step('Filling out the login form', async () => {
      await this.login.loginAndContinue(testData.email, testData.password);
      await this.page.waitForNavigation();
      await this.page.goBack();
      await this.page.waitForLoadState('load');
    });
  }

  async logoutUser() {
    await test.step('log out of the profile', async () => {
      await this.login.logoutUser();
    });
  }

}

export { Pretest };
