import { useFormik } from 'formik';
import axios from 'axios';
import config from './config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Formikform() {
    let navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: '',
            lastname: '',
            city: '',
            country: '',
            email: '',
            password: ''
        },
        onSubmit: ({ firstname, lastname, city, country, email, password }) => {
            if(firstname === "") {
                alert('firstname field is required')
            }
            else if(lastname === "") {
                alert('lastname field is requred')
            }
            else if(city === "") {
                alert('city field is requred')
            }
            else if(country === "") {
                alert('country field is requred')
            }
            else if (email === "") {
                alert('email field is requred');
            } else if (!email.includes("@")) {
                alert('Please enter valid email address');
            } else if (password === "") {
                alert('password field is required');
            } 
            else {
            
            axios.post(`${config.authURL}register`, { firstname, lastname, city, country, email, password }).then(data => navigate('/login'))
        }
    }
    });
    return (

        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{
                            mt:1
                        }}>
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


                            <Button
                                component={Link}
                                sx={{ mt: 3, mb: 2 }}
                                className="float-start"
                                to="/"
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
                                Register
                            </Button>

                        </Box>
                    </Box>

                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?weather)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        </ThemeProvider>



    )
}