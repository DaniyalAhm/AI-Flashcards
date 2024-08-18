import { SignUp } from '@clerk/nextjs'
import { Box, Container, Typography } from '@mui/material'

export default function Page() {
  return (
    <Box minHeight='100vh'  sx={{
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Container maxWidth='sm' sx={{backgroundColor:'white'}}>
            <Typography variant='h3' color='#007BFF' sx={{mb:4}}>
                Sign up
            </Typography>
            <SignUp />
        </Container>
         
    </Box>
  
  )
}
