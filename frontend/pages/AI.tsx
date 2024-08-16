import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './AI.module.css'; // Ensure this path matches the location of your CSS module

export default function AI() {
    const [cards, setCards] = useState([{}]);
    const [input, setInput] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/AI', {
            params: { 'query': input }
        })
        .then(response => {
            setCards(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [input]);

    function handleSubmit(event) {
        event.preventDefault(); // Correct the typo here
        setInput(event.target[0].value); // Assuming this logic is intentional
        event.target[0].value = '';
    }
    console.log(cards)

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
            
        <h1>
            {cards.toString()}

        </h1>

        </div>
    );
}
