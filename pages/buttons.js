import { test, expect } from '@playwright/test';

class AllButtons {
  constructor(page, header) {
    this.page = page;
    this.header = header;
    this.StartTradingBtnOnMainBanner = page.locator('a.btn--darkText[data-type="top_banner_btn"]');
    this.TryDemoBtnOnMainBanner = page.locator('.btn--emptyblack');
    this.TradeBtnOnWidgetMostTraded = page.locator('.mostTraded__btn');
    this.SellBtnOnBanner = page.locator('a.button-main.sell');
    this.BuyBtnOnBanner = page.locator('a.button-main.buy');
    this.contetntBlockStartTradingBtn = page.locator('[data-type = "wdg_go_to_market_btn"]');
    // Footer
    this.DownloadOnAppStore = page.locator('[data-type = "banner_capital_ios"]');
    this.DownloadOnGooglePlay = page.locator('[data-type = "banner_capital_google"]');
    this.ExploreWebPlatform = page.locator('[data-type="banner_capital_platform"]');
    this.CreateAndVerifyBtn = page.locator('i.regSteps__item.js_signup');
    this.LogoAppStore = page.locator('a.globalnav-link-apple');
    this.IconCapital = page.locator('picture#ember3');
    this.ProductNameOnAppstore = page.getByRole('heading', {
      name: 'Capital.com: Trading & Finance 17+',
    });
    this.LinkCapitalComOnAppstore = page.getByRole('heading', {
      name: 'Capital Com SV Investments Limited',
    });
    this.LogoGooglePlay = page.locator('a.f0UV3d');
    this.ProdactNameOnGoogleplay = page.locator('h1.Fd93Bb.F5UCq.p5VxAd');
    this.LinkCapitalComOnGoogleplay = page.locator('div.Vbfug.auoIOc');
  }

  // To check element visibility and click
  async checkBtnVisibilityAndClick(element, elementName) {
    try {
      await element.waitFor({ state: 'visible', timeout: 5000 });
      await element.click();
    } catch (error) {
      console.error(`${elementName} is not visible.`);
    }
  }

  // Methods

  async clickStartTradingBtnOnMainBanner() {
    const elementName = '[Start Trading] button on Main Banner';
    await test.step(`Click ${elementName}`, async () => {
      const element = await this.StartTradingBtnOnMainBanner;
      await this.checkBtnVisibilityAndClick(element, elementName);
    });
  }

  async clickTryDemoBtnOnMainBanner() {
    const elementName = '[Try Demo] button on Main Banner';
    await test.step(elementName , async () => {
      const element = await this.TryDemoBtnOnMainBanner;
      await this.checkBtnVisibilityAndClick(element, elementName);
    });
  }

  async clickTradeBtnOnWidgetMostTraded() {
    const elementName = "[Trade] button on Widget 'Most Traded'";
    await test.step(`Click ${elementName}`, async () => {
      try {
        await this.TradeBtnOnWidgetMostTraded.toBeVisible();
        await this.TradeBtnOnWidgetMostTraded.click();
      } catch (error) {
        console.log(`For test on FCA license the button [Trade] does not displayed `);
        test.skip();
      }
    });
  }

  async clickDownloadOnAppStoreBtn() {
    const elementName = "[Download on the App Store] button in the block 'Sign up and trade smart today'";
    await test.step(`Click ${elementName}`, async () => {
      await this.DownloadOnAppStore.click();
      await this.page.waitForNavigation();
      // await this.page.waitForTimeout(1000);
    });
    await test.step('Page of App Store is opened', async () => {
      await expect(this.LogoAppStore).toBeVisible();
      await expect(this.IconCapital).toBeVisible();
      await expect(this.ProductNameOnAppstore).toBeVisible();
      await expect(this.LinkCapitalComOnAppstore).toBeVisible();
    });
    await test.step('Go back to the previous page', async () => {
      // await this.page.waitForTimeout(1000);
      await this.page.goBack();
    });
  }

  async clickDownloadOnGooglePlayBtn() {
    const elementName = "[Download on the Google Play] button in the block 'Sign up and trade smart today'";
    await test.step(`Click ${elementName}`, async () => {
      await this.DownloadOnGooglePlay.click();
      await this.page.waitForNavigation(); // ожидание загрузки новой страницы
      const currentUrl = this.page.url();
      if (currentUrl === 'https://apps.apple.com/IE/app/id1230088754?mt=8') {
        await test.step('Page of Google Store is not opened', async () => {
          console.log('The link to App Store instead of Google Play');
          throw new Error();
        });
      } else {
        await test.step('Page of App Store is opened', async () => {
          await expect(this.LogoGooglePlay).toBeVisible();
          await expect(this.ProdactNameOnGoogleplay).toHaveText(/Online Broker - Capital.com/);
          await expect(this.LinkCapitalComOnGoogleplay).toBeVisible();
        });
      }
    });
    await test.step('Go back to the previous page', async () => {
      // await this.page.waitForTimeout(1000);
      await this.page.goBack();
    });
  }

  async clickExploreWebPlatformBtn() {
    const elementName = "[Explore Web Platform] button in the block 'Sign up and trade smart today'";
    await test.step(`Click ${elementName}`, async () => {
      await this.ExploreWebPlatform.click();
      await this.page.waitForNavigation();
    });
  }

  async clickCreateAndVerifyBtn() {
    const elementName = "[Create & verify your account] button in the block 'Still looking for a broker you can trust?'";
    await test.step(`Click ${elementName}`, async () => {
      const element = await this.CreateAndVerifyBtn;
      await this.checkBtnVisibilityAndClick(element, elementName);

    });
  }

  async clickSellBtnOnBanner() {
    const elementName = '[Sell] button in the Banner [Trading Instrument]';
    await test.step(`Click ${elementName}`, async () => {
      const element = await this.SellBtnOnBanner;
      await this.checkBtnVisibilityAndClick(element, elementName);
    });
  }

  async clickBuyBtnOnBanner() {
    const elementName = '[Buy] button in the Banner [Trading Instrument]';
    await test.step(`Click ${elementName}`, async () => {
      const element = await this.BuyBtnOnBanner;
      await this.checkBtnVisibilityAndClick(element, elementName);
    });
  }

  async clickContentBlockStartTradingBtn() {
    const elementName = '[Start trading] button in the content block';
    await test.step(`Click ${elementName}`, async () => {
      const element = await this.contetntBlockStartTradingBtn;
      await this.checkBtnVisibilityAndClick(element, elementName);
    });
  }
}

export { AllButtons };
