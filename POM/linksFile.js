const fs = require('fs');

class LinksFile {
    constructor(page, header, login) {
        this.page = page;
        this.header = header;
        this.login = login;
    }

    async linksSaveToFile_UnReg(page, bannerBtn, signup) {
        const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
        if (links.length === 0) {
            console.log("There are no links on this page and testing of the second level is impossible");
        } else {
            console.log("links", links);
        }
        // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
        await fs.writeFileSync('links.txt', links.join('\n'));
        const fileContent = fs.readFileSync('links.txt', 'utf-8');
        const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
        const randomLinks = await getRandomElements(linksFromFile, 3);
        for (let i = 0; i < randomLinks.length; i++) {
            await page.goto(randomLinks[i]);
            // await bannerBtn.clickStartTradingBtnOnMainBanner();
            // await signup.signUpFormIsVisible();

            if (links.includes(randomLinks[i])) {
                console.log(`Testing on the '${randomLinks[i]}' link was successfully completed`);
            } else {
                console.log(`Testing on the '${randomLinks[i]}' link was failed`);
            }
        }
    }

    async linksSaveToFile_UnAuth(page, bannerBtn, login) {
        const links = await page.$$eval('a[data-type="sidebar_deeplink"]', (elements) => elements.map((el) => el.href));
        if (links.length === 0) {
            console.log("There are no links on this page and testing of the second level is impossible");
        } else {
            console.log("links", links);
        }
        // запись элементов массива "links" в файл "links.txt" с использованием метода "writeFileSync" из модуля "fs"
        await fs.writeFileSync('links.txt', links.join('\n'));
        const fileContent = fs.readFileSync('links.txt', 'utf-8');
        const linksFromFile = fileContent.split('\n').filter((link) => link !== '');
        const randomLinks = await getRandomElements(linksFromFile, 3);
        for (let i = 0; i < randomLinks.length; i++) {
            await page.goto(randomLinks[i]);
            // await bannerBtn.clickStartTradingBtnOnMainBanner();
            // await login.LoginFotmIsVisible();

            if (links.includes(randomLinks[i])) {
                console.log(`Testing on the '${randomLinks[i]}' link was successfully completed`);
            } else {
                console.log(`Testing on the '${randomLinks[i]}' link was failed`);
            }
        }
    }
}

    async function getRandomElements(array, count) {
    const randomized = array.slice();

    for (let i = randomized.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
    }

    return randomized.slice(0, count);
}


module.exports = { LinksFile };
