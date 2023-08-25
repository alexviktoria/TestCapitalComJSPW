const { test, expect } = require("@playwright/test");

class BannerBtn {
    constructor(page) {
        this.page = page;
        this.StartTradingBtnOnMainBanner = page.locator('a.btn--darkText[data-type="top_banner_btn"]')
        this.TryDemoBtnOnMainBanner = page.locator('.btn--emptyblack')
        this.TradeBtnOnWidgetMostTraded = page.$$('.mostTraded__btn')
        this.SellBtnOnBanner = page.locator('a.button-main.sell')
        this.BuyBtnOnBanner = page.locator('a.button-main.buy')
        // Footer
        this.DownloadOnAppStoreBtn = page.locator('[data-type = "banner_capital_ios"]')
        this.DownloadOnGooglePlayLink = page.locator('[data-type = "banner_capital_google"]')
        this.ExploreWebPlatformLink = page.locator('[data-type="banner_capital_platform"]')
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
        await this.StartTradingBtnOnMainBanner.click()
    }

    async clickTryDemoBtnOnMainBanner() {
        await this.TryDemoBtnOnMainBanner.click()
    }
    
    async clickTradeBtnOnWidgetMostTraded() {
        try {
            await this.TradeBtnOnWidgetMostTraded.toBeVisible();
            await this.TradeBtnOnWidgetMostTraded.click();
        } catch (error) {
            console.log(`For test on FCA license the button [Trade] doen't displayed `)
            throw new Error();
        }
    }

    async clickDownloadOnAppStoreBtn() {
        await this.DownloadOnAppStoreBtn.click();
    }

    async clickDownloadOnGooglePlayLink() {
        await this.DownloadOnGooglePlayLink.click();
        await this.page.waitForNavigation(); // ожидание загрузки новой страницы
        const currentUrl = await this.page.url();
        if (currentUrl === 'https://apps.apple.com/IE/app/id1230088754?mt=8') {
            console.log('The link to App Store instead of Google Play');
            throw new Error();
        }
    }


    async clickExploreWebPlatformLink() {
        await this.ExploreWebPlatformLink.click();
    }

    async clickCreateAndVerifyBtn() {
        await this.CreateAndVerifyBtn.click();
    }

    async clickSellBtnOnBanner() {
        await this.SellBtnOnBanner.click();
    }

    async clickBuyBtnOnBanner() {
        await this.BuyBtnOnBanner.click();
    }
}
module.exports = { BannerBtn };