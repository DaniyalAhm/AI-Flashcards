'use client';

import React from "react";
import axios from "axios";
import { useState } from "react";
export default function Collection(){
    const [value, setValue] = useState(' This is the original Message')

    axios.get('http://127.0.0.1:5000/').then((response ) =>{
        setValue(response.data)


    }).catch(error =>{

        console.log(error)


    })



    return (

        <h1 style={{top:'30%', position:'absolute'}}>
            Your Collection: 
            {value}


        </h1>



    )


}