class SignUpPage {
  constructor(page) {
    this.page = page;
    this.BtnSignUp = page.locator("[data-type=btn_header]");
    this.FormSignUp = page.locator("#s_overlay > .form-container-white");
    this.FormSignUpOnPaltform = page.locator('signup-component.modal2');
    // header name
    this.HeaderNameSignUp = page.locator('[class="signup-form"] .h1');
    this.HeaderNameSignUpOnPlatform = page.locator('.modal__header');
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

  async  TextContinueButton() {
    return await this.ContinueButton.innerText();
  }

  async clickCloseSignUpFormBtn() {
    await this.CloseSignUpFormBtn.click();
  }

}
module.exports = { SignUpPage };