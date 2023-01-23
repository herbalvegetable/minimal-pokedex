const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

app.get('/api/pokemon/all', async (req, res) => {
    console.log('scraping pokemon list...');
    let pokemonList = await scrapePokedex();

    res.send(pokemonList);
});

async function scrapePokedex(){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://pokemondb.net/pokedex/all', {waitUntil: 'networkidle0'});

    await page.waitForSelector('#pokedex');
    
    let pokemonRows = await page.$$('#pokedex tbody > tr');
    let pokemonList = [];

    for (let i = 0; i < pokemonRows.length; i++) {
        const tr = pokemonRows[i];
        const tdList = await tr.$$('td');

        let imgSrc = await tdList[0].$eval('.infocard-cell-img .img-fixed', img => img.src);
        let [name, href] = await tdList[1].$eval('.ent-name', a => [a.innerText, a.href]);
        let types = await tdList[2].$$eval('.type-icon', aList => aList.map(a => a.innerText));

        pokemonList.push({imgSrc, name, href, types});
    }

    console.log(pokemonList);
    
    browser.close();

    return pokemonList;
}
