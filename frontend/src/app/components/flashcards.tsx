import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import styles from './css_files/card.module.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useEffect } from 'react';
export default function FlashCard({ Question, Answer }) {
  const [Revealed, setReveal] = useState(false)
  const [display, setDisplay] = useState('')
  const [text, setText] = useState('Reveal Answer')

  useEffect(() =>{
    if(Revealed==false){
      setDisplay('');
      setText('Reveal Answer')

    }
    else{
      setDisplay(Answer);
      setText('Hide Answer')
    }



  },[Revealed]
  
  )


  function handleSubmit(){
    if(Revealed==false){
      setReveal(true);

    }
    else{
        setReveal(false);

    }

  }




  return (
    <Card sx={{
      maxWidth: 345, // sets a maximum width for the card
      height:400,
      margin: 'auto', // centers the card horizontally
      backgroundColor: '#007BFF',
      color: 'white',
      boxShadow: 3, // adds shadow to the card for a 3D effect
      '&:hover': {
        boxShadow: 6, // increases shadow when hovered for a lifting effect
      },
      p: 5, // Padding inside the Box around all content

      mb: "30px !important", // Margin at the bottom of the Box
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} color="white" gutterBottom>
          {Question}
        </Typography>
        <Button size="small"  variant="body2" color="white" margin='10%' fontSize='20px'
        style={{
            backgroundColor:'white',
            color:'black',
            


        }}  
        
        
        onClick={handleSubmit}>{text}</Button>
        <Typography variant="body2" color="white" margin='10%' fontSize='20px'>
          {display}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Actions can be added here if needed */}
      </CardActions>
    </Card>
  );
}
