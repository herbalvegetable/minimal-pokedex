const cheerio = require('cheerio');

async function scrapePokemon(href) {
    const res = await fetch(`https://bulbapedia.bulbagarden.net${href}`);
    const body = await res.text();

    const $ = cheerio.load(body);

    let pokemonData = {};

    pokemonData.name = $($('b')[0]).text(); // name
    pokemonData.imgSrc = $($('img')[2]).attr('src'); // imgSrc

    return pokemonData;
}

module.exports = { scrapePokemon };