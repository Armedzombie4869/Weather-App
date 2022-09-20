import React from 'react';
import {useFormik} from 'formik';
import axios from 'axios'
import config from './config';
import {useNavigate} from 'react-router-dom';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function Forgot () {
    let navigate = useNavigate();
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
            email: ''
      },
      onSubmit: ({email}) => {
          axios.post(`${config.authURL}emailsend`,{email}).then(user => {
            navigate('/changepassword');
          }).catch((err)=> {
            console.log(err);
          })
  
      }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
