import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './AI.module.css';
import FlashCard from '../src/app/components/cards';
import Carousel from 'react-material-ui-carousel';

export default function AI() {
    const [cards, setCards] = useState([{Question:"", Answer:''}]);
    const [input, setInput] = useState('');
    const [button, setButton] = useState(false)

    useEffect(() => {
        if (input) {
            axios.get('http://127.0.0.1:5000/AI', {
                params: { 'query': input }
            })
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [input]);

    function handleSubmit(event) {
        event.preventDefault();
        setInput(event.target[0].value.trim());
        event.target[0].value = '';
        setButton(true);
    }

    return (
        <div className={styles.body}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <input 
                    className={styles.inputField}
                    placeholder="Enter a topic"
                    type="text"
                />
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>

            {button && (
                <div>
                <button className={styles.button}>Save</button>
            
                <div className={styles.carouselContainer}>
                <Carousel 
                    navButtonsAlwaysVisible={true}
                    navButtonsProps={{
                        style: {
                            backgroundColor: 'white',
                            color: 'black',
                        }
                    }}
                >
                    {cards.map((card, index) => (
                        <div key={index} className={styles.cardContainer}>
                            <FlashCard Question={card.Question} Answer={card.Answer} />
                        </div>
                    ))}
                </Carousel>
            </div>
            </div>


            )}




        </div>
    );
}
