import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Weather App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {

  return (
   
    <Box component="footer" sx={{  py: 6 }}>
      <Container maxWidth="lg">
        <Divider sx={{ bgcolor: "#000000" }}/>
        <Typography variant="h6" align="center" gutterBottom>
          Weather App
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Created By Sanskar Upadhayay, Syed Tausif Ahmed, Krishna Kant Jha
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}


export default Footer;