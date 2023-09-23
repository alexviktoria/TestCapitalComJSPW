const { test, expect } = require("@playwright/test");

class AllButtons {
    constructor(page, header) {
        this.page = page;
        this.header = header;
        this.StartTradingBtnOnMainBanner = page.locator('a.btn--darkText[data-type="top_banner_btn"]')
        this.TryDemoBtnOnMainBanner = page.locator('.btn--emptyblack')
        this.TradeBtnOnWidgetMostTraded = page.locator('.mostTraded__btn')
        this.SellBtnOnBanner = page.locator('a.button-main.sell')
        this.BuyBtnOnBanner = page.locator('a.button-main.buy')
        // Footer
        this.DownloadOnAppStore = page.locator('[data-type = "banner_capital_ios"]')
        this.DownloadOnGooglePlay = page.locator('[data-type = "banner_capital_google"]')
        this.ExploreWebPlatform = page.locator('[data-type="banner_capital_platform"]')
        this.CreateAndVerifyBtn = page.locator('i.regSteps__item.js_signup')
        this.LogoAppStore = page.locator('a.globalnav-link-apple')
        this.IconCapital = page.locator('picture#ember3')
        this.ProductNameOnAppstore = page.getByRole('heading', { name: 'Capital.com: Trading & Finance 17+' })
        this.LinkCapitalComOnAppstore = page.getByRole('heading', { name: 'Capital Com SV Investments Limited' })
        this.LogoGooglePlay = page.locator('a.f0UV3d')
        this.ProdactNameOnGoogleplay = page.locator('h1.Fd93Bb.F5UCq.p5VxAd')
        this.LinkCapitalComOnGoogleplay = page.locator('div.Vbfug.auoIOc')
    }

    // Methods

    async clickStartTradingBtnOnMainBanner() {
        await test.step("Click [Start Trading] button on Main Banner", async () => {
            await this.StartTradingBtnOnMainBanner.click()
        });
    }

    async clickTryDemoBtnOnMainBanner() {
        await test.step("Click [Try Demo] button on Main Banner", async () => {
            await this.TryDemoBtnOnMainBanner.click()
        });

    }

    async clickTradeBtnOnWidgetMostTraded() {
        await test.step("Click [Trade] button on Widget 'Most Traded'", async () => {
            try {
                await this.TradeBtnOnWidgetMostTraded.toBeVisible();
                await this.TradeBtnOnWidgetMostTraded.click();
            } catch (error) {
                console.log(`For test on FCA license the button [Trade] doen't displayed `)
                throw new Error();
            }
        });
    }

    async clickDownloadOnAppStoreBtn() {
        await test.step("Click [Download on the App Store] button in the block 'Sign up and trade smart today'", async () => {
            await this.DownloadOnAppStore.click();
            await this.page.waitForNavigation();
            // await this.page.waitForTimeout(1000);
        });
        await test.step("Page of App Store is opened", async () => {
            await expect(this.LogoAppStore).toBeVisible();
            await expect(this.IconCapital).toBeVisible();
            await expect(this.ProductNameOnAppstore).toBeVisible();
            await expect(this.LinkCapitalComOnAppstore).toBeVisible();
        })
        await test.step("Go back to the previous page", async () => {
            // await this.page.waitForTimeout(1000);
            await this.page.goBack();
        })
    }

    async clickDownloadOnGooglePlayBtn() {
        await test.step("Click [Download on the Google Play] button in the block 'Sign up and trade smart today'", async () => {
            await this.DownloadOnGooglePlay.click();
            await this.page.waitForNavigation(); // ожидание загрузки новой страницы
            const currentUrl = await this.page.url();
            if (currentUrl === 'https://apps.apple.com/IE/app/id1230088754?mt=8') {
                console.log('The link to App Store instead of Google Play');
                throw new Error();
            } else {
                await test.step("Page of App Store is opened", async () => {
                    await expect(this.LogoGooglePlay).toBeVisible();
                    await expect(this.ProdactNameOnGoogleplay).toHaveText(/Online Broker - Capital.com/);
                    await expect(this.LinkCapitalComOnGoogleplay).toBeVisible();
                });
            }
        });
        await test.step("Go back to the previous page", async () => {
            // await this.page.waitForTimeout(1000);
            await this.page.goBack();
        });

    }


    async clickExploreWebPlatformBtn() {
        await test.step("Click [Explore Web Platform] button in the block 'Sign up and trade smart today'", async () => {
            await this.ExploreWebPlatform.click();
            await this.page.waitForNavigation();
        });
        
    }

    async clickCreateAndVerifyBtn() {
        await test.step("Click [Create & verify your account] button in the block 'Still looking for a broker you can trust?'", async () => {
            await this.CreateAndVerifyBtn.click();
            await this.page.waitForTimeout(5000);
        });

    }

    async clickSellBtnOnBanner() {
        await this.SellBtnOnBanner.click();
    }

    async clickBuyBtnOnBanner() {
        await this.BuyBtnOnBanner.click();
    }
}
module.exports = { AllButtons };