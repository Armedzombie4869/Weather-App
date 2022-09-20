import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import config from './config';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

export default function Forgot() {
    let navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            otp: '',
            password: '',
            confirmpassword:''

        },
        onSubmit: ({ otp, password,confirmpassword }) => {
            if(password === '' || confirmpassword === '' || otp === ''){
                alert('Please enter all fields');
            }
            else if(password !== confirmpassword){
                alert('Password and confirm password should match');
            }
            else{
                axios.post(`${config.authURL}changepassword`, { otp, password }).then(user => {
                    alert('Password change successful')
                    navigate('/login');
                }).catch((err) => {
                    alert('Error')
                })
            }
            

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
                        Set New Password
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="otp"
                            label="OTP"
                            name="otp"
                            autoComplete="otp"
                            onChange={formik.handleChange}
                            value={formik.values.otp}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            id="changepassword"
                            onChange={formik.handleChange}
                            value={formik.values.confirmpassword}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
