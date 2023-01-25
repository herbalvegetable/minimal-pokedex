const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const { scrapePokemon } = require('./pokemonScraper');

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

app.get('/api/pokemon', async (req, res) => {
    const { href } = req.query;

    const pokemonData = await scrapePokemon(href);

    res.send(pokemonData);
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