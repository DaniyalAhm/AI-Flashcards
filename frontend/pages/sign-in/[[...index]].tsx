import { SignIn } from '@clerk/nextjs'
import { Box, Container } from '@mui/material'


export default function Page() {
  <Box minHeight='100vh'  sx={{
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Container maxWidth='sm' sx={{backgroundColor:'white'}}>

      <SignIn />
  </Container>
   
</Box>
}