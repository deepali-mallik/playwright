import { defineConfig } from "@playwright/test";

export default defineConfig({


    webServer: {
        command: 'npm start',
        url: 'http://wwww.facebook.com'
    }
})

const config = {
    use: {
        headless: false //headless property to false to run the browser in UI or non-headless mode
    },
};

module.exports = config;  //in order to instantiate the config

/* playwright by default run in the headless mode however, we can change that to show what the framework is actually doing */

