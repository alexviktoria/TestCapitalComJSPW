class LoginPage {
    constructor(page) {
      this.page = page;
      this.UserName = page.locator("#l_f_email > .field__control");
      this.Password = page.locator("#l_f_pass > .field__control");
      this.ContinueButton = page.locator(".form-container-white > .form-container-small-content > form > .btn");
      this.BtnLogIn = page.locator("#wg_loginBtn");
      this.BtnMyAccount = page.locator('button#wg_userarea');
      this.Btnlogout = page.locator('.logout-user');
      this.FormLogIn = page.locator("#l_overlay > .form-container-white");
      this.HeaderNameLogIn = page.locator("[class='form-container-small-header'] > .h1");
      this.LogMeAfter = page.locator("input[name=l_rem]");
      this.ForgotPasswordLink = page.locator('[class="l_btn_forgot"]');
      this.SignUpLinkForm = page.locator(".form-container-white > .form-container-small-header > p > .l_btn_signup");
      this.CloseLoginFormBtn = page.locator('#l_overlay .form-container-white .button-cleared');
      //Form Login on Platform
      this.FormLoginOnPlatform = page.locator('cdk-dialog-container#login');
      this.HeaderNameLoginOnPlatform = page.locator('.modal__header-title');
      this.SignUpLinkFormOnPlatform = page.locator(':nth-child(1) > .txt__link');
      this.EmailOnPlatform = page.locator('.form.ng-pristine > :nth-child(1) > :nth-child(3)');
      this.PasswordOnPlatform = page.locator('.form.ng-pristine > :nth-child(1) > :nth-child(5)');
      this.ForgotPasswordLinkOnPlatform = page.locator('.txt.txt_link');
      this.BtnContinueOnPlatform = page.locator('.button-main')
      this.LogoCapitalOnPlatform = page.locator('a.logo')
    }
  
    async visit() {
      await this.page.goto("https://capital.com/");
    }
    
    async validLogin(email, password) {
      await this.UserName.fill(email);
      await this.Password.fill(password);
      await this.ContinueButton.click({force: true});
    }

    async clickBtnLogIn() {
      await this.BtnLogIn.click();
  }

  async loginAndContinue(email, password) {
    await this.clickBtnLogIn();
    await this.validLogin(email, password);
    await this.ContinueButton.waitFor();
    await this.ContinueButton.click();
  }

  async logoutUser() {
    await this.BtnMyAccount.click();
    await this.Btnlogout.click();
    
  }

  async FormLoginBeVisible() {
    try {
      await this.expect(FormLogIn).isVisible();
  } catch (error) {
      console.log("Opened a 'Sign up' form instead of a 'Login' form in UnAuth role");
      throw new Error();
  }
  }

  async FormLoginOnPlatformBeVisible() {
    try {
      await this.expect(FormLoginOnPlatform).isVisible();
  } catch (error) {
      console.log("Opened a 'Sign up' form instead of a 'Login' form in UnAuth role");
      throw new Error();
  }
  }

  }
  module.exports = { LoginPage };