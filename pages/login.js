import { test, expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    this.page = page;
    this.UserName = page.locator("#l_f_email > .field__control");
    this.Password = page.locator("#l_f_pass > .field__control");
    this.ContinueButton = page.locator(
      ".form-container-white > .form-container-small-content > form > .btn",
    );
    this.BtnLogIn = page.locator("#wg_loginBtn");
    this.BtnMyAccount = page.locator("button#wg_userarea");
    this.Btnlogout = page.locator(".logout-user");
    this.FormLogIn = page.locator("#l_overlay > .form-container-white");
    this.HeaderNameLogIn = page.locator(
      "[class='form-container-small-header'] > .h1",
    );
    this.LogMeAfter = page.locator("label.checkbox");
    this.ForgotPasswordLink = page.locator('[class="l_btn_forgot"]');
    this.SignUpLinkForm = page.locator(
      ".form-container-white > .form-container-small-header > p > .l_btn_signup",
    );
    this.CloseLoginFormBtn = page.locator(
      "#l_overlay .form-container-white .button-cleared",
    );
    //Form Login on Platform
    this.FormLoginOnPlatform = page.locator("cdk-dialog-container#login");
    this.HeaderNameLoginOnPlatform = page.locator(".modal__header-title");
    this.SignUpLinkFormOnPlatform = page.locator(":nth-child(1) > .txt__link");
    this.EmailOnPlatform = page.locator(
      ".form.ng-pristine > :nth-child(1) > :nth-child(3)",
    );
    this.PasswordOnPlatform = page.locator(
      ".form.ng-pristine > :nth-child(1) > :nth-child(5)",
    );
    this.ForgotPasswordLinkOnPlatform = page.locator(".txt.txt_link");
    this.ContinueBtnOnPlatform = page.locator(".button-main");
    this.LogoCapitalOnPlatform = page.locator("a.logo");
  }

  async visit() {
    await this.page.goto("https://capital.com/");
  }

  async validLogin(email, password) {
    await this.UserName.fill(email);
    await this.Password.fill(password);
    // await this.ContinueButton.click();
  }

  async clickBtnLogIn() {
    await this.BtnLogIn.click();
  }

  async loginAndContinue(email, password) {
    // await this.clickBtnLogIn();
    await this.validLogin(email, password);
    await this.LogMeAfter.click();
    // await this.ContinueButton.waitFor();
    await this.ContinueButton.click();
  }

  async logoutUser() {
    await this.BtnMyAccount.click();
    await this.Btnlogout.click();
  }

  async LoginFormIsVisible() {
    await test.step("Login Form is visible", async () => {
      try {
        await expect(this.FormLogIn).toBeVisible();
        await expect(this.HeaderNameLogIn).toBeVisible();
        await expect(this.UserName).toHaveAttribute("type", "email");
        await expect(this.Password).toHaveAttribute("type", "password");
        await expect(this.LogMeAfter).toBeChecked();
        await expect(this.ForgotPasswordLink).toBeVisible();
        await expect(this.ContinueButton).toBeVisible();
        await expect(this.SignUpLinkForm).toBeVisible();
        await this.CloseLoginFormBtn.click();
      } catch (error) {
        console.log(
          "BUG!!! Opened a 'Sign up' form instead of a 'Login' form in UnAuth role",
        );
        throw new Error();
      }
    });
  }

  async LoginFormOnPlatformIsVisible() {
    await test.step("Login Form on platform is visible", async () => {
      try {
        await expect(this.FormLoginOnPlatform).toBeVisible();
        await expect(this.HeaderNameLoginOnPlatform).toBeVisible();
        await expect(this.SignUpLinkFormOnPlatform).toBeVisible();
        await expect(this.EmailOnPlatform).toHaveAttribute("type", "email");
        await expect(this.PasswordOnPlatform).toHaveAttribute(
          "type",
          "password",
        );
        await expect(this.ContinueBtnOnPlatform).toBeVisible();
      } catch (error) {
        console.log(
          "BUG!!! Opened a 'Sign up' form instead of a 'Login' form in UnAuth role",
        );
        throw new Error();
      }
    });

    await test.step("Go back to the previous page", async () => {
      await this.page.goBack();
    });
  }
}

export { LoginPage };
