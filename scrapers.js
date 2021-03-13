const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imageUrl = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('//*[@id="acrCustomerReviewText"]');
    const txt2 = await el3.getProperty('textContent');
    const reviews = await txt2.jsonValue();

    console.log(imageUrl, title, reviews);

    browser.close();
}

scrapeProduct('https://www.amazon.ca/AmazonBasics-Beginner-Acoustic-Guitar-Strings/dp/B07QLZ32FB/ref=sr_1_1_sspa?dchild=1&keywords=guitar&qid=1615606395&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzUFI1WlI3RUU2VzE1JmVuY3J5cHRlZElkPUEwNzM2MDc1M0haQ0ZaWFdPNVFCRSZlbmNyeXB0ZWRBZElkPUEwMzQ1MjYwMTRLRzRTR0xGV0gzRiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=');
