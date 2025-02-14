//our test file must be stored in a new folder inside root/project folder called "tests"
//name of the file must be filename.spec.js - this is a prerequisite for the playwright engine in order to recognize the tests

const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test'); //this import package imports the test object from newly installed package

test.describe('My Test Suite', () => {  //this test describe method to define test suites in which we can create set of tests
    test('My Test Case', async ({ page }) => {   //test method to define an individual instance of a test
        // const browser = await firefox.launch();
        // const page = await browser.newPage();

        await authentication(page); // same test cript that we used previously to automate the login process

        await prepareOrder(page); // to add the item to cart

        await placeOrder(page);

        // await browser.close();

        console.log("Test Run Passed");
    });
    // test('My test 2'){

    // }

    
});

async function authentication(page) {
    await page.goto('https://bitheap.tech'); 
    await page.click('#menu-item-2330'); 
    // await page.locator("[name='xoo-el-username']").fill(process.env.BITHEAP_USERNAME) 
    await page.locator("[name='xoo-el-username']").fill("deepali.mallik1997+7@gmail.com");
    // await page.locator("[name='xoo-el-password']").fill(process.env.PASS)
    await page.locator("[name='xoo-el-password']").fill("Deepali");
    await page.locator('xpath=/html/body/div[6]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button').click()
    const text = await page.locator('css=#menu-item-2333').textContent()
    if(text != "Hello, Deepali") 
        console.error("The authentication was not successfull")
    await page.screenshot({ path: 'login.png'});
    console.log("Sucessfully logged in");
    
}
/* asynchronous function allows javascript to perform other tasks while waiting for some operations, like network requests to complete
which is common in web automation

*/
 
async function prepareOrder(page) {
    await page.click('#menu-item-1310'); //id selector
    await page.locator('xpath=//*[@id="main"]/nav/ul/li[2]/a').click() //xpath selector to locate pagination page 2
    await page.locator('css=#main > ul > li.product.type-product.post-211.status-publish.instock.product_cat-uncategorized.purchasable.product-type-simple > a.button.product_type_simple.add_to_cart_button.ajax_add_to_cart').click(); //css selector
    await page.locator('xpath=/html/body/nav/div[1]/div[3]/div/a').click(); //xpath selector
    await page.getByText('Proceed to checkout').click(); //button that includes text proceed to checkout and click it
    await page.getByPlaceholder('House number and street name').fill("Kathmandu") //find an input field with placeholder text and fill in value
    console.log("Successfully proceeded to checkout");
    
}

async function placeOrder(page) {
    await page.locator('xpath=//*[@id="billing_postcode"]').fill("1234"); //xpath selector and fill in value
    await page.locator("#billing_city").fill("Kathmandu"); //id selector and fill in value
    await page.click("#place_order") //id selector and click on button
    // await page.waitForTimeout(2000);
    await expect(page.locator('text=Order received')).toHaveCount(1); 
    /*an assertion to check something is true. this specifc assertion checks that there is exactly one element on the page 
    containing the text "order received". it's used to confirm that order was successfully placed and that the confirmation message
    is displayed.
    */
    console.log("Successfully placed order");

} 

//to run this suite we are going to use the engine that is automatically imported through this library using command npx playwright test
//in the output we see a different output which is more verbose when it finishes of what tests were run, what passed and if any failed, which one?

//comment added