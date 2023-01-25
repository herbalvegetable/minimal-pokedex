import { useState, useEffect, useRef } from 'react';
import { Image } from 'react-bootstrap';

import styles from './PokemonCard.module.css';

export default function PokemonCard({ name, form, href, imgSrc, typeColour, setSelectedHref }) {

    useEffect(() => {

    }, []);

    return (
        <>
            <div 
                className={styles.card} 
                style={{'--typec': typeColour ? `${typeColour}59` : 'gray'}}
                onClick={e => {
                    setSelectedHref(href);
                }}>
                <Image
                    src={imgSrc}
                    alt={name}
                    className={styles.img}/>
                <div className={styles.text}>
                    <span className={styles.name}>{name}</span>
                    {
                        form.split('<br>').map((str, i) => {
                            return <span key={i.toString()} className={styles.form}>{str}</span>
                        })
                    }
                </div>
            </div>
        </>
    )
}