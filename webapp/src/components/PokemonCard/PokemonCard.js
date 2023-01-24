import { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

import styles from './PokemonCard.module.css';

export default function PokemonCard({ name, href, imgSrc}) {

    useEffect(() => {

    }, []);

    return (
        <div className={styles.card}>
            <Image 
                src={imgSrc}
                alt={name}
                className={styles.img}/>
            <span className={styles.name}>{name}</span>
        </div>
    )
}