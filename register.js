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
    await page.click('#menu-item-2331'); // playwright is instructed to simulate a mouse click on an element with teh ID menu item 2331. this could be a button or a link on a webpage
    // await page.locator("[name='xoo_el_reg_email']").fill(process.env.BITHEAP_EMAIL) 
    await page.type('input[name="xoo_el_reg_email"]', 'deepali.mallik1997+7@gmail.com'); // types email address in the email input field
    // await page.locator("[name='xoo_el_reg_email']").fill("deepali.mallik1997+1@gmail.com") 
    // await page.locator("[name='xoo_el_reg_fname']").fill(process.env.BITHEAP_FIRSTNAME)
    await page.locator("[name='xoo_el_reg_fname']").fill("Deepali");
    // await page.locator("[name='xoo_el_reg_lname']").fill(process.env.BITHEAP_LASTNAME)
    await page.locator("[name='xoo_el_reg_lname']").fill("Mallik");
    // await page.locator("[name='xoo_el_reg_pass']").fill(process.env.BITHEAP_PASSWORD)
    await page.locator("[name='xoo_el_reg_pass']").fill("Deepali");
    // await page.locator("[name='xoo_el_reg_pass_again']").fill(process.env.BITHEAP_CONFIRMPASSWORD)
    await page.locator("[name='xoo_el_reg_pass_again']").fill("Deepali");
    // await page.waitForTimeout(1000);
    await page.check("[name='xoo_el_reg_terms']")           //await page.locator("[name='xoo_el_reg_terms']").click()
    await page.check("[name='xoo-mailpoet-subscribe']")     // await page.locator("[name='xoo-mailpoet-subscribe']").click()
    await page.locator('xpath=/html/body/div[6]/div[2]/div/div/div[2]/div/div/div[3]/div/form/button').click()
    await page.waitForSelector('#menu-item-2333 > a', { state: 'visible' });
    const text = await page.locator('#menu-item-2333 > a').textContent();
    if(text != "Hello, Deepali") //switch statement to check if the value/text is Hello, Deepali or not
        console.error("The registration was not successfull")
    await page.screenshot({ path: 'register.png'});
    console.log("successfully registered")
}