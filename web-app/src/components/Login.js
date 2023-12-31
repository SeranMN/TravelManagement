import React, { useEffect, useState, forwardRef } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../train.jpg'


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const theme = createTheme();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [toggle, setToggle] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [severity, SetSeverity] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate()

    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnack(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.get(`http://localhost:5000/api/user/${userName}?password=${password}`,)
            .then((data) => {
                console.log(data);
                if (data.status == 200) {
                    sessionStorage.setItem('role', data.data.role)
                    sessionStorage.setItem('id', data.data.id)
                    sessionStorage.setItem('name', data.data.name)
                    sessionStorage.setItem('phoneNumber', data.data.phoneNumber)
                    sessionStorage.setItem('status', data.data.status)
                    sessionStorage.setItem('email', data.data.email)

                    if(data.data.role === "Travel Agent") {
                        navigate('/travelAgentHome')
                    }
                    else if(data.data.role === "Admin") {
                        navigate('/adminHome')
                    }
                } 

            }).catch((err) => {
                console.log(err)
                if (err.response && err.response.status === 400) {
                    setMsg(err.response.data);
                    SetSeverity("error");
                    setOpenSnack(true)
                } else {
                    setMsg("oops! Somthing Went Wrong");
                    SetSeverity("error");
                    setOpenSnack(true)
                }
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={8}
                    sx={{
                        backgroundImage: `url(${Logo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        marginTop: '-200px',
                    }}
                />
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <form onSubmit={handleSubmit} >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="User Name (NIC)"
                                name="userName"
                                autoComplete="userName"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
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
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">

                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="text.secondary" align="center" marginTop={5}>
                            {'Copyright © '}
                            <Link color="inherit" >
                                RailReady
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack} anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}>

                <Alert onClose={handleCloseSnack} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}

export default Login