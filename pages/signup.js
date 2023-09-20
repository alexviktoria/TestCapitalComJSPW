const { test, expect } = require("@playwright/test");

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.BtnSignUp = page.locator("[data-type=btn_header]");
    this.FormSignUp = page.locator("#s_overlay > .form-container-white");
    this.FormSignUpOnPaltform = page.locator('signup-component.modal2');
    // header name
    this.LoginLinkForm = page.locator('.signup-form > .form-container-small-header > p > .l_btn_signup');
    this.LoginLinkFormOnPlatform = page.locator('.txt__link');
    this.PolicyLink = page.locator('.signup-form a[href*="terms-and-policies"]');
    this.PolicyLinkOnPlatform = page.locator('.checkbox__link');
    this.CloseSignUpFormBtn = page.locator('#s_overlay .form-container-white .button-cleared')
    this.CloseSignUpFormOnPlatform = page.locator('.checkbox__link')
    // register buttons
    this.UserName = page.locator("#s_overlay-email > .field__control");
    this.Password = page.locator("#s_overlay-pass > .field__control");
    this.ContinueButton = page.locator(".signup-form > .form-container-small-content > form > .btn");
    this.EmailOnPlatform = page.locator(':nth-child(4) > .form-control');
    this.PasswordOnPlatform = page.locator(':nth-child(6) > .form-control');
    this.ContinueButtonOnPlatform = page.getByRole("button", { name: "Continue" })
    this.CheckBoxBySigningUp = page.locator('.checked > .iconex-check-mark');

  }

  async visit() {
    await this.page.goto("https://capital.com/");
  }

  async validSignUp(email, password) {
    await this.UserName.fill(email);
    await this.Password.fill(password);
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

  async signUpFormIsVisible() {
    await test.step("Sign Up Form is visible", async () => {
      await expect(this.FormSignUp).toBeVisible();
      await expect(this.LoginLinkForm).toBeVisible();
      await expect(this.UserName).toHaveAttribute("type", "email");
      await expect(this.Password).toHaveAttribute("type", "password");
      await expect(this.ContinueButton).toBeVisible();
      await expect(this.PolicyLink).toBeVisible();
    });
    await test.step("Sign Up Form is closed", async () => {
      await this.CloseSignUpFormBtn.click();
    });
  }

  async signUpFormOnPlatformIsVisible() {
    await test.step("Sign Up Form On Platform is visible", async () => {
      await expect(this.FormSignUpOnPaltform).toBeVisible();
      await expect(this.LoginLinkFormOnPlatform).toBeVisible();
      await expect(this.EmailOnPlatform).toHaveAttribute("type", "email");
      await expect(this.PasswordOnPlatform).toHaveAttribute("type", "password");
      await expect(this.ContinueButtonOnPlatform).toBeVisible();
      await this.page.waitForLoadState('networkidle');
    });
    await test.step("Go back to the previous page", async () => {
      await this.page.goBack();
    });
  }

}
module.exports = { SignUpPage };