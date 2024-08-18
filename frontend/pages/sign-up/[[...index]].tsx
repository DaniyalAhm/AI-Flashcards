import { SignUp } from '@clerk/nextjs'
import { Box, Container } from '@mui/material'

export default function Page() {
  return (
    <Box minHeight='100vh'  sx={{
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Container maxWidth='sm' sx={{backgroundColor:'white'}}>

            <SignUp />
        </Container>
         
    </Box>
  
  )
}