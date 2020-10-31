const axios = require('axios');
const { parse } = require('node-html-parser'); 
// provides a function that facilitates the use of DOM manipulation on the retrieved object
const puppeteer = require('puppeteer');

// FOR DYNAMIC SITE SCRAPING
(async () => {
    // creating an object which is a reference to the chronium browser
    const browser = await puppeteer.launch();

    // creating a new instance of puppeteer and create a new page or tab within the browser
    const page = await browser.newPage(); 

    // pointing the page to a particular url
    await page.goto('http://www.blabme.xyz/');

    // get the actual data from the page which is the rendered web page
    const data = await page.evaluate(() => document.body.innerHTML); // extracting all HTML from body tag from the rendered document
    await page.screenshot({ path: 'site.png' });
    // await page.pdf({ path: 'site.pdf' })
    await browser.close(); // when youre done, in other to avoid the script to hang we close the browser tab

    const dom = parse(data);
    const h2 = dom.querySelector('h2');

    console.log(h2.text)
})();






// FOR STATIC SITE SCRAPING
// (async () => {
//     // using axois to get the html content from the provided url
//     // it retrieves the content and returns a promise which is handled by the await keyword
//     // the await keyword handles the promise and stores the js object in the page var
//     const page = await axios.get('http://localhost:3001/');
//     // console.log(page);

//     // for now we are interested in the data property of the object returned
//     const data = page.data;
//     // console.log(data);

//     // constructing the ....
//     const dom = parse(data);
//     // console.log(dom);

//     // getting the headers or h1s
//     const heading = dom.querySelector('h1');
//     const content = dom.querySelectorAll('p')
//         .reduce((acc, text) => acc + text, ''); // adds all the returned strings (p text) into one string
//     const img = dom.querySelector('.fried-chicken');
//     const h2 = dom.querySelector('h2');
//     console.log(heading.text); // gets the text or the h1 child element
//     console.log(content);

//     // to get the img src
//     // browser method 
//     // console.log(img.src); n-h-p wont parse this

//     console.log(img.getAttribute('src'));
//     console.log(h2.text); // errror text of null - becos n-h-p cant parse a dynamic content
// })();