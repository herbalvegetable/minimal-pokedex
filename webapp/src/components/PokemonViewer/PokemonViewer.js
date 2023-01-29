import { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

import styles from './PokemonViewer.module.css';

export default function PokemonViewer({name, imgSrc}) {

    useEffect(() => {

    }, []);

    return (
        <div className={styles.main}>
            <Image 
                src={imgSrc}/>
            <h2 className={styles.title}>{name}</h2>
        </div>
    )
}