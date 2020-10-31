const puppeteer = require('puppeteer');

// configuration - both props are not important for headless operation cos its non-gui-ish
// tho they make it easier to see and take screenshots
const chromeOptions = {
    headless: false, // in order to see what we are doing 
    defaultViewPort: null, // to account for ugly visual glitch where viewport doesnt fill the window
    slowMo: 10
};

(async () => {
    const browser = await puppeteer.launch(chromeOptions); // browser instance
    const page = await browser.newPage(); // new browser tab
    await page.goto('https://old.reddit.com/login'); // goes to specified url on new browser tab

    console.log('browser running');

    // Typing in text fields is almost comically intuitive with the puppeteer API,
    // you simply pass in selector that identifies the element and the desired string
    // to the .type() method

    // in this case we would be using the id selectors of the fields (username, password)
    // I guess the type method types in the second string into the fields with the following selector
    // Types into a selector that identifies a form element
    // the delay option allows to simulate/imitate/pretend typing like a real world user, adding delay between each character
    await page.type('#user_reg', 'awesomexD_username', { delay: 100 });
    await page.type('#passwd_reg', 'SuperStrongP@sssworD', { delay: 50 });
    await page.type('#passwd2_reg', 'SuperStrongP@sssworD', { delay: 50 });

    // in this case reddit doesnt have an id selector for the button
    // using a sligthly more complicate selector
    // BUTTON
    // so we are targeting the id of the form which is "#register-form"
    // and selecting the button element using it's attr "type" with a value "submit"
    // by the way click performs a click event on the element passed as parameter
    await page.click('#register-form button[type=submit]');
})();

// CASES
// After automated form submission we get are not allowed in because of captcha
// but we dont see it, as it is not provided before the form submission because of the automation speed
// we also get an error in the console - "No slots provided to apstag.fetchBids"
// These are part of non-captcha hurdles

// RACE CONDITION
// When browsers are automated they are manipulated many,
// many times faster than a normal human can operate and that often leads to code being
// executed in an order that developers had not tested (this is called a race condition)

// Reddit’s page suffers from a race condition where Google’s reCAPTCHA
// is only being rendered after the second password field has been focused.
// focused in the sense that the second pswd field is setted as the active element
// in the current document, by a JS mehod Focus(), HTMLElementObject.focus()

// focus explanation link
// https://www.geeksforgeeks.org/javascript-focus/

// Our script operates so quickly that focus occurs before the reCAPTCHA script is ready
// There are many solutions to this but the easiest is to add
// the smallest delay necessary that gets around this race condition.

// There are many ways we can delay but Puppeteer’s browser launch options
// take in a “slowMo” value that globally delays all actions a set amount
// This is a heavy handed approach since it slows down any Puppeteer action
// but it’s a good place to start









