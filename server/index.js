const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const cors = require('cors');
const { scrapePokemon } = require('./pokemonScraper');

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.get('/api/pokemon/all', async (req, res) => {
    console.log('reading pokemon list...');

    const pokemonList = await getPokemonList();

    res.send(pokemonList);
});

app.get('/api/pokemon', async (req, res) => {
    const { href } = req.query;
    console.log(`Scrape single pokemon: ${href}`)
    
    const pokemonData = await scrapePokemon(href);

    res.send(pokemonData);
});

async function getPokemonList() {
    const data = fs.readFileSync('./pokemon-list.txt', { encoding: 'utf-8', flag: 'r' });

    const lines = data.split('\n');
    const headers = lines[0].split('|').map(h => h.trim());

    let pokemonList = lines.slice(1, lines.length-1).map((row, i) => {
        let pokemonData = row.split('|');
        let pokemon = {};
        for (let i = 0; i < headers.length; i++) {
            pokemon[headers[i]] = pokemonData[i].trim();
        }
        return pokemon;
    });

    return pokemonList;
}
// console.log(getPokemonList());