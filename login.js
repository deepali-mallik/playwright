const { chromium } = require('playwright'); //using chrome browser to initialize our scripts

(async () =>  //starting with async function we are creating a browser object
{
    const browser = await chromium.launch(); //creating a browser object
    const page = await browser.newPage(); //creating a new page

    await authentication(page);  //creating our custom funtion/method where we pass page object as a reference
    await browser.close();
})();

async function authentication(page) { // in this method I have written the entire set of instructions that we will follow in order to authenticate through login in bitheap website  
    await page.goto('https://bitheap.tech'); // first we navigate to the website which we want to automate using goto method
    await page.click('#menu-item-2330'); // playwright is instructed to simulate a mouse click on an element with teh ID menu item 2330. this could be a button or a link on a webpage
    // await page.locator("[name='xoo-el-username']").fill(process.env.BITHEAP_USERNAME) //becasue of security concern we will store our username and password in environment variable
    await page.locator("[name='xoo-el-username']").fill("deepali.mallik1997+5@gmail.com");
    // await page.locator("[name='xoo-el-password']").fill(process.env.PASS)
    await page.locator("[name='xoo-el-password']").fill("Deepali")
    await page.locator('xpath=/html/body/div[6]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button').click()
    const text = await page.locator('css=#menu-item-2333').textContent()
    if(text != "Hello, Deepali") //switch statement to check if the value/text is Hello, Playwright or not
        console.error("The authentication was not successfull")
    await page.screenshot({ path: 'login.png'});
    console.log("Sucessfully logged in")

}