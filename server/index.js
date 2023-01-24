const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

app.get('/api/pokemon/all', async (req, res) => {
    console.log('reading pokemon list...');

    const pokemonList = await getPokemonList();

    res.send(pokemonList);
});

async function getPokemonList() {
    const data = fs.readFileSync('./pokemon-list.txt', { encoding: 'utf-8', flag: 'r' });
    const lines = data.split('\n');
    const headers = lines[0].split('|');
    let pokemonList = lines.slice(1, lines.length-1).map((row, i) => {
        let pokemonData = row.split('|');
        let pokemon = {};
        for (let i = 0; i < headers.length; i++) {
            pokemon[headers[i]] = pokemonData[i];
        }
        return pokemon;
    });
    return pokemonList;
}
// console.log(getPokemonList());

// async function scrapePokemonList() {
//     console.log('scraping pokemon list...');

//     fs.writeFileSync('./pokemon-list.txt', '');
//     fs.appendFileSync('./pokemon-list.txt', 'name|href|types|smallImgSrc\n');

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.goto('https://pokemondb.net/pokedex/all', { waitUntil: 'networkidle0' });

//     await page.waitForSelector('#pokedex');

//     let pokemonRows = await page.$$('#pokedex tbody > tr');

//     for (let i = 0; i < pokemonRows.length; i++) {
//         const tr = pokemonRows[i];
//         const tdList = await tr.$$('td');

//         let pokemonDataList = [];

//         await page.waitForSelector('#pokedex');

//         let [name, href] = await tdList[1].$eval('.ent-name', a => [a.innerText, a.href]); // name, href
//         pokemonDataList = [...pokemonDataList, name, href];

//         pokemonDataList.push(await tdList[2].$$eval('.type-icon', aList => aList.map(a => a.innerText))); // types

//         pokemonDataList.push(await tdList[0].$eval('.infocard-cell-img .img-fixed', img => img.src)) // smallImgSrc

//         // await page.goto(href);
//         // const imgSelector = '//*[@id="tab-basic-1"]/div[1]/div[1]/p[1]/a/picture/img';
//         // await page.waitForXPath(imgSelector);
//         // const largeImgEl = await page.$x(imgSelector);
//         // pokemonDataList.push(await largeImgEl.evaluate(img => img.src)) // largeImgSrc
//         // await page.goBack();

//         let pokemonData = `${pokemonDataList.join('|')}\n`;

//         fs.appendFile('./pokemon-list.txt', pokemonData, err => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }

//             console.log(`[${i + 1}/${pokemonRows.length}] Added pokemon: ${name}`);
//         });
//     }

//     browser.close();
// }
// scrapePokemonList();

async function scrapePokemonList() {
    console.log('scraping pokemon list...');

    fs.writeFileSync('./pokemon-list.txt', '');
    fs.appendFileSync('./pokemon-list.txt', 'name|href|imgSrc\n');

    const res = await fetch('https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number');
    const body = await res.text();

    const $ = cheerio.load(body);

    let pokemonHrefs = $('table.roundy tbody > tr[style="background:#FFF"]');

    $(pokemonHrefs).map((i, tr) => {
        let pokemonDataList = [];

        pokemonDataList.push($($($(tr).find('td')[2]).find('a')).text()) // name
        pokemonDataList.push($($(tr).find('td a')).attr('href')) // href
        pokemonDataList.push($($(tr).find('img')).attr('src')); // imgSrc

        let pokemonDataStr = `${pokemonDataList.join('|')}\n`;

        fs.appendFile('./pokemon-list.txt', pokemonDataStr, err => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`[${i + 1}/${pokemonHrefs.length}] Added pokemon: ${pokemonDataList[0]}`);
        });
    });
}
scrapePokemonList();

async function scrapePokemon(href) {

    const res = await fetch(`https://bulbapedia.bulbagarden.net${href}`);
    const body = await res.text();

    const $ = cheerio.load(body);

    let pokemonData = [];

    pokemonData.push($($('b')[0]).text()); // name
    pokemonData.push($($('img')[2]).attr('src')) // imgSrc

    return pokemonData;
}