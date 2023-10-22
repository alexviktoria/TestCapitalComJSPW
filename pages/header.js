const { test, expect } = require("@playwright/test");

const language = "Polski"
const country = "Poland"
exports.Header = class Header {
    constructor(page) {
        this.page = page;
        this.getMainLogo = page.locator('[class="cc-logo hideXs"]')
        this.getEducationMenu = page.locator('a[data-type="nav_id96"]')
        this.PositionTrading = page.locator('a[data-type="nav_id528"]')
        this.SwingTrading = page.locator('a[data-type="nav_id529"]')
        this.SharesTrading = page.locator('a[data-type="nav_id106"]')
        this.CountryAndLang = page.locator('div .licLangSw__btn')
        this.DropdownCountry = page.getByRole("textbox")
        this.AcceptAllCookies = page.locator('#onetrust-accept-btn-handler')
        this.GetCountry = page.getByRole("link", { name: country })
        this.GetLanguage = page.getByRole("link", { name: language })
        // Platform
        this.LogoCapitalOnPlatform = page.locator('a.logo')
        this.AccountModeLive = page.locator('div.account__mode_live')
        this.AccountModeDemo = page.locator('div.account__mode_demo')
        // Countries
        this.GermanyCountry = page.locator('li.js-analyticsClick[data-type="nav_country_germany"]')
        this.TurkeyCountry = page.locator('li.js-analyticsClick[data-type="nav_country_turkey"]')
        this.Australia = page.locator('li.js-analyticsClick[data-type="nav_country_australia"]')
        this.UnitedKingdomCountry = page.getByRole("link", { name: "United Kingdom" })
        this.SpainCountry = page.locator('li.js-analyticsClick[data-type="nav_country_spain"]')
        this.ArabicCountry = page.locator('li.js-analyticsClick[data-type="nav_country_united_arab_emirates"]')
        this.FranceCountry = page.locator('li.js-analyticsClick[data-type="nav_country_france"]')
        this.GermanyCountry = page.locator('li.js-analyticsClick[data-type="nav_country_germany"]')
        this.GreeceCountry = page.locator('li.js-analyticsClick[data-type="nav_country_greece"]')
        this.PolandCountry = page.locator('li.js-analyticsClick[data-type="nav_country_poland"]')

    }

    // Methods
    async clickMainLogo() {
        await this.getMainLogo.click();
    }

    async clickEducationMenu() {
        await this.getEducationMenu.click();
    }

    async hoverEducationMenu() {
        await this.getEducationMenu.hover();
    }

    async clickAcceptAllCookies() {
        await this.AcceptAllCookies.click();
    }

    async clickPositionTrading() {
        await test.step("Hover Education Menu", async () => {
            await this.getEducationMenu.hover()
            await this.page.waitForLoadState('networkidle');
        });
        await test.step("Click Position Trading", async () => {
            if (await this.PositionTrading.isVisible()) {
                await this.PositionTrading.click();
            } else {
                console.log(`For test on '${language}' language the page "Education->Position Trading" doesn't exist on production`);
                test.skip();
            }
        });
    }

    async clickSwingTrading() {
        await test.step("Hover Education Menu", async () => {
            await this.getEducationMenu.hover()
            await this.page.waitForLoadState('networkidle');
        });
        await test.step("Click Position Trading", async () => {
        if (await this.SwingTrading.isVisible()) {
            await this.SwingTrading.click();
        } else {
            console.log(`For test on '${language}' language the page "Education->Swing Trading" doesn't exist on production`);
            test.skip();
        }
    });
    }

    async clickSharesTrading() {
        await test.step("Hover Education Menu", async () => {
        await this.getEducationMenu.hover()
        await this.page.waitForLoadState('networkidle');
    });
    await test.step("Click Shares Trading", async () => {
        if (await this.SharesTrading.isVisible()) {
            await this.SharesTrading.click();
        } else {
            console.log(`For test on '${language}' language the page "Education->Shares Trading" doesn't exist on production`);
            test.skip();
        }
    });
    }

    async clickDropdownCountry() {
        await this.DropdownCountry.first().click();
    }

    async hoverCountryAndLang() {
        await this.CountryAndLang.hover();
    }

    async clickGetCountry() {
        await this.GetCountry.click();
    }

    async clickGetLanguage() {
        await this.GetLanguage.click();
    }

    async pagePlatformLiveIsVisible() {
        await test.step("Page Platform is visible", async () => {
            await expect(this.page).toHaveURL('https://capital.com/trading/platform/');
            // await expect(this.LogoCapitalOnPlatform).toBeVisible();
            await expect(this.page).toHaveTitle(/Trading Platform | Capital.com/); 
            // await expect(this.AccountModeLive).toBeVisible();
        });

        await test.step("Go back to the previous page", async () => {
            await this.page.goBack();
        });
    }
    async pagePlatformDemoIsVisible() {
        await test.step("Page Platform 'Demo' is visible", async () => {
            await expect(this.page).toHaveURL('https://capital.com/trading/platform/?mode=demo');
            // await expect(this.LogoCapitalOnPlatform).toBeVisible();
            await expect(this.page).toHaveTitle(/Trading Platform | Capital.com/);
            // await expect(this.AccountModeDemo).toBeVisible();
        });

        await test.step("Go back to the previous page", async () => {
            await this.page.goBack();
        });
    }

    async pagePlatformInstrumentIsVisible() {
        await test.step("Page Platform  'Instrument' is visible", async () => {
            await expect(this.page).toHaveURL('https://capital.com/trading/platform/');
            // await expect(this.LogoCapitalOnPlatform).toBeVisible();
            await expect(this.page).toHaveTitle(/Trading Platform | Capital.com/);
            // await expect(this.AccountModeLive).toBeVisible();
        });

        await test.step("Go back to the previous page", async () => {
            await this.page.goBack();
        });
    }

}