import { test } from '@playwright/test';
import { Header } from './header';
import { LoginPage } from './login';

const testData = {
  email: 'alexviktoria1609@gmail.com',
  password: 'Av-123456789',
};
class Pretest {
  constructor(page, header, login) {
    this.page = page;
    this.header = header;
    this.login = login;
    this.header = null;
    this.login = null;
  }
  async pretestUnRegRole() {
    this.header = new Header(this.page);
    await test.step('Go to capital.com', async () => {
      await this.page.goto('/');
    });
    await test.step('Accept all cookies', async () => {
      await this.header.clickAcceptAllCookies();
    });

    await test.step('Select country ', async () => {
      await this.header.hoverCountryAndLang();
      await this.header.clickDropdownCountry();
      // const selectedCountry = await this.header.clickGetCountry(); // Сохраняем выбранную страну
      // return selectedCountry; // Возвращаем выбранную страну
      await this.header.clickGetCountry();
    });
    await test.step('Select language', async () => {
      await this.header.hoverCountryAndLang();
      await this.header.clickGetLanguage();
    });
  }

  async pretestUnAuthRole() {
    this.header = new Header(this.page);
    this.login = new LoginPage(this.page);
    await test.step('Go to capital.com', async () => {
      await this.page.goto('/');
    });
    // user unauthorization
    await test.step("Click 'Login' button", async () => {
      await this.login.clickBtnLogIn();
      await test.step('Filling out the login form', async () => {
        await this.login.loginAndContinue(testData.email, testData.password);
        await this.page.waitForNavigation();
        await this.page.goBack();
        await this.page.waitForLoadState('networkidle');
      });
    });
    await test.step('log out of the profile', async () => {
      await this.login.logoutUser();
    });

    await test.step('Select country', async () => {
      await this.header.hoverCountryAndLang();
      await this.header.clickDropdownCountry();
      await this.header.clickGetCountry();
    });
    await test.step('Select language', async () => {
      await this.header.hoverCountryAndLang();
      await this.header.clickGetLanguage();
    });
  }

  async pretest_Auth_Role() {
    this.header = new Header(this.page);
    this.login = new LoginPage(this.page);
    await test.step('Go to capital.com', async () => {
      await this.page.goto('/');
    });
    // user unauthorization
    await test.step("Click 'Login' button", async () => {
      await this.login.clickBtnLogIn();
    });
    await test.step('Filling out the login form', async () => {
      await this.login.loginAndContinue(testData.email, testData.password);
      await this.page.waitForNavigation();
      await this.page.goBack();
      await this.page.waitForLoadState('networkidle');
    });

    await test.step('Select country', async () => {
      await this.header.hoverCountryAndLang();
      await this.header.clickDropdownCountry();
      await this.header.clickGetCountry();
    });
    await test.step('Select language', async () => {
      await this.header.hoverCountryAndLang();
      await this.header.clickGetLanguage();
    });
  }
}

export { Pretest };
