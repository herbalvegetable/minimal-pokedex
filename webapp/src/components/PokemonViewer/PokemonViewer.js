import { useState, useEffect } from 'react';

import styles from './PokemonViewer.module.css';

export default function PokemonViewer(props) {

    useEffect(() => {

    }, []);

    return (
        <div className={styles.main}>
            <h2 className={styles.title}>PokemonViewer</h2>
        </div>
    )
}