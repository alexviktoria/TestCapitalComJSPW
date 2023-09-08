
class Pretest {
    constructor(page, header) {
    this.page = page;
    this.header = header;
    }
async pretestUnRegRole(){
        await this.page.goto("/");
        //accept all Cookies
        await this.header.clickAcceptAllCookies();
        // select country and language
        await this.header.hoverCountryAndLang();
        await this.header.clickDropdownCountry()
        await this.header.clickGetCountry();
        await this.header.hoverCountryAndLang();
        await this.header.clickGetLanguage();  
    }
}

module.exports = { Pretest };
