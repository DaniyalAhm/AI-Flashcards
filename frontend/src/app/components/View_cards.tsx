import React from "react";
import Carousel from 'react-material-ui-carousel';
import FlashCard from "./flashcards";
import Button from '@mui/material/Button';
import styles from './css_files/view_cards.module.css'; 
export default function View_Cards({ cards, handleClose }) {
    return (
        <div className={styles.widget}>
            <Button onClick={handleClose} className={styles.closeButton}>
                Close
            </Button>
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
                    <div key={index}>
                        <FlashCard Question={card.Question} Answer={card.Answer} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
