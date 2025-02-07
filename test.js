const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://bitheap.tech/');
    await page.screenshot({ path: 'home.png'});
    await browser.close();
})();

//await page.selectOption('#country-select','US');  //selects the option with the value "US" in dropdown
// (element id, value)