'use client';

import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Basic_Cards from "./basic_cards";
import styles from './css_files/Collection.module.css';
export default function Collection(){
    const [titles, setTitles] = useState([])  
    const [cards, setCards] = useState([{ Answer:'', Question: ''}]);
 

    useEffect(() =>{
        axios.get('http://127.0.0.1:5000/').then((response ) =>{
            setTitles(response.data.titles)
            setCards(response.data.cards)
            console.log(response.data.titles)
    
    
        }).catch(error =>{
    
            console.log(error)
    
    
        })
    
    },[]


);


    return (

        <div className={styles.collectionContainer}>

    {titles.map((title ,index) =>{
                return(
                    <div key={index} className={styles.card}>
                        <Basic_Cards Title={title}  cards={cards[index]}/>
                    </div>
                );


            })
            

}
        </div>

 );


    
    


}
