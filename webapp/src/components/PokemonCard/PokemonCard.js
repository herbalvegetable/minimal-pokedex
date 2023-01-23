import { useState, useEffect } from 'react';

import styles from './PokemonCard.module.css';

export default function PokemonCard({ imgSrc, name, href, types }) {

    useEffect(() => {

    }, []);

    return (
        <div className={styles.card}>
            PokemonCard
        </div>
    )
}