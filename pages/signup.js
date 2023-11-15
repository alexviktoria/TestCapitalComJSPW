import { test, expect } from '@playwright/test';

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.BtnSignUp = page.locator('[data-type=btn_header]');
    // this.FormSignUp = page.locator('#s_overlay > .form-container-white');
    this.FormSignUp = page.locator('div[id="s_overlay"]:not(.hidden)');
    this.FormSignUpOnPaltform = page.locator('signup-component.modal2');
    // header name
    this.LoginLinkForm = page.locator('.signup-form > .form-container-small-header > p > .l_btn_signup');
    this.LoginLinkFormOnPlatform = page.locator('.txt__link');
    this.PolicyLink = page.locator('.signup-form a[href*="terms-and-policies"]');
    this.PolicyLinkOnPlatform = page.locator('.checkbox__link');
    this.CloseSignUpFormBtn = page.locator('#s_overlay .form-container-white .button-cleared');
    this.CloseSignUpFormOnPlatform = page.locator('.checkbox__link');
    // register buttons
    this.fieldEmail = page.locator('label[id="s_overlay-email"] > input[type="email"]');
    this.fieldPassword = page.locator('label[id="s_overlay-pass"] > input[type="password"]');
    this.ContinueButton = page.locator('.signup-form > .form-container-small-content > form > .btn');
    this.EmailOnPlatform = page.locator(':nth-child(4) > .form-control');
    this.PasswordOnPlatform = page.locator(':nth-child(6) > .form-control');
    this.ContinueButtonOnPlatform = page.getByRole('button', {
      name: 'Continue',
    });
    this.CheckBoxBySigningUp = page.locator('.checked > .iconex-check-mark');
  }

  async visit() {
    await this.page.goto('https://capital.com/');
  }

  async validSignUp(email, password) {
    await this.fieldEmail.fill(email);
    await this.fieldPassword.fill(password);
    await this.ContinueButton.click();
  }

  async clickBtnSignUp() {
    await this.BtnSignUp.click();
  }

  async TextContinueButton() {
    return await this.ContinueButton.innerText();
  }

  async clickCloseSignUpFormBtn() {
    await this.CloseSignUpFormBtn.click();
  }

  async signUpFormIsVisible(page) {
    let pageUrl = page.url();
    let urlSU = "https://capital.com/trading/signup"
    // TODO подозреваю есть линк для демо
    // let urlSUD = "https://capital.com/trading/signup"
    if ( pageUrl === urlSU) {
      console.log("open web page signup");
      await page.goBack();
    } else {
      await test.step('Sign Up Form is visible', async () => {

        await this.page.waitForLoadState('load');
        await this.FormSignUp.waitFor({ state: 'visible', timeout: 5000 });

        await expect(await this.FormSignUp).toBeVisible();
        await expect(await this.LoginLinkForm).toBeVisible();
        await expect(await this.fieldEmail).toHaveAttribute('type', 'email');
        await expect(await this.fieldPassword).toHaveAttribute('type', 'password');
        await expect(await this.ContinueButton).toBeVisible();

      });
      await test.step('Sign Up Form is closed', async () => {
        await this.CloseSignUpFormBtn.click();
      });
    }
  }

  async signUpFormOnPlatformIsVisible() {
    await test.step('Sign Up Form On Platform is visible', async () => {
      await expect(this.FormSignUpOnPaltform).toBeVisible();
      await expect(this.LoginLinkFormOnPlatform).toBeVisible();
      await expect(this.EmailOnPlatform).toHaveAttribute('type', 'email');
      await expect(this.PasswordOnPlatform).toHaveAttribute('type', 'password');
      await expect(this.ContinueButtonOnPlatform).toBeVisible();
      await this.page.waitForLoadState('load');
    });
    await test.step('Go back to the previous page', async () => {
      await this.page.goBack();
    });
    return true;
  }
}

export { SignUpPage };
