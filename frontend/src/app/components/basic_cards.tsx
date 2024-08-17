import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import View_Cards from "./View_cards";
import styles from './css_files/view_cards.module.css';

export default function Basic_Cards({ Title, cards }) {
    const [open, setOpen] = useState(false); 

    const handleToggleWidget = () => {
        setOpen(!open); 
    };

    return (
        <div>
            {!open &&
            (      <Card sx={{
                maxWidth: 345,
                height: 400,
                margin: 'auto',
                backgroundColor: '#007BFF',
                color: 'white',
                boxShadow: 3,
                '&:hover': {
                    boxShadow: 6,
                },
                p: 5,
                mb: "30px !important",
            }}>
                <CardContent>
                    <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="white" gutterBottom>
                        {Title}
                    </Typography>
                    <hr style={{ marginBottom: '20px', width: '200%' }}></hr>
              {/*      <Button 
                        size="medium"  
                        variant="body2" 
                        color="white" 
                        fontSize='20px'
                        onClick={handleToggleWidget} // Toggle the widget on button click
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            marginTop: '20px'
                        }}>
                        Learn More
                    </Button>*/}
                </CardContent>
            </Card>
)
            
            
            }
            {open && (
                <>
                    <div className={styles.overlay} onClick={handleToggleWidget}></div> 
                                        <div className={styles.widget}>
                        <View_Cards cards={cards} handleClose={handleToggleWidget} />
                    </div>
                </>
            )}
        </div>
    );
}
