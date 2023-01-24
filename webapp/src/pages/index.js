import { useState, useEffect } from 'react';

import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css';

import PokemonCard from '@/components/PokemonCard/PokemonCard';
import PokemonViewer from '@/components/PokemonViewer/PokemonViewer';

export const getStaticProps = async () => {
	const res = await fetch('http://localhost:5000/api/pokemon/all');
	const data = await res.json();

	return {
		props: { pList: data },
	}
}

export default function Home({ pList }) {

	const [pokemonList, setPokemonList] = useState(pList);

	useEffect(() => {
		console.log(pList);
	}, []);

	return (
		<>
			<Head>
				<title>Minimalistic Pokedex</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h2>Minimalistic Pokedex</h2>
			<div className={styles.main}>
				<div className={styles.pokemon_grid}>
					{
						pokemonList.map((pokemon, i) => {
							return <PokemonCard key={i.toString()} {...pokemon}/>
						})
					}
				</div>
				<PokemonViewer />
			</div>
		</>
	)
}
