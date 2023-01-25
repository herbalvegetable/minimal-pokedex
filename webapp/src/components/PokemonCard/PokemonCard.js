import { useState, useEffect, useRef } from 'react';
import { Image } from 'react-bootstrap';

import styles from './PokemonCard.module.css';

export default function PokemonCard({ name, href, imgSrc, typeColour }) {

    useEffect(() => {
        console.log(typeColour);
    }, []);

    return (
        <>
            <div className={styles.card} style={{'--typec': typeColour ? `${typeColour}A6` : 'gray'}}>
                <Image
                    src={imgSrc}
                    alt={name}
                    className={styles.img}/>
                <span className={styles.name}>{name}</span>
            </div>
        </>
    )
}