import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import config from './config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';


const theme = createTheme();

export default function EditProfile() {
    let navigate = useNavigate()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: '',
            lastname: '',
            city: '',
            country: ''
            
        },
        onSubmit: ({ firstname, lastname, city, country }) => {
            if (firstname === "") {
                alert('firstname field is required')
            }
            else if (lastname === "") {
                alert('lastname field is requred')
            }
            else if (city === "") {
                alert('city field is requred')
            }
            else if (country === "") {
                alert('country field is requred')
            }
           
            else {
               
                const token = localStorage.getItem('token');
                axios.put(`${config.authURL}editprofile`, { firstname, lastname, city, country },{headers: {
                    Authorization: token
                   }}).then(data => navigate('/profile'))
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
                        Edit Profile
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label="First Name"
                            name="firstname"
                            autoComplete="firstname"
                            onChange={formik.handleChange}
                            value={formik.values.firstname}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="lastname"
                            autoComplete="lastname"
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="city"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                            autoComplete="country"
                            onChange={formik.handleChange}
                            value={formik.values.country}
                        />
                         <Button
                                component={Link}
                                sx={{ mt: 3, mb: 2 }}
                                className="float-start"
                                to="/profile"
                            >
                                Go back
                            </Button>
                            <Button
                                color="success"
                                className="float-end"
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Confirm Edits
                            </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}
