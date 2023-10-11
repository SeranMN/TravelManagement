import { React, useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar"
import Logo from '../train.jpg'

const Registration = () => {

    const [name, setName] = useState('');
    const [NIC, setNIC] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [pwd, setPwd] = useState();
    const [confirmPwd, setConfirmPwd] = useState();
    const vertical = 'bottom'
    const horizontal = 'right'


    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [severity, SetSeverity] = useState("");
    const [msg, setMsg] = useState("");

    const [openSnack, setOpenSnack] = useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnack(false);
    };

    const onSubmit = () => {
        const user = {
            id: NIC,
            name: name,
            email: email,
            phoneNumber: phone,
            gender: gender,
            address: address,
            role: "TravelAgent",
        }

        axios.post('http://localhost:5000/api/user', user)
            .then(() => {
                setMsg("Successfully Added user");
                SetSeverity("success");
                setOpenSnack(true);
            }).catch((err) => {
                if (err.response && err.response.status === 400) {
                    setMsg(err.response.data);
                    SetSeverity("error");
                    setOpenSnack(true);
                } else {
                    setMsg("oops! Somthing Went Wrong");
                    SetSeverity("error");
                    setOpenSnack(true);
                }
            })
    }

    return (
        <div style={{ backgroundImage: `url(${Logo})`, backgroundRepeat: 'round', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
                component="span"
                sx={{
                    transform: "scale(1.0)",
                    backgroundColor: "white",
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    m:3
                }}
            >
                <Card sx={{ width: 650 }}>
                    <CardContent
                        component="img"
                        src="/logo.png"
                        height={"150"}
                        width={"100"}
                    />

                    <Typography sx={{ mb: 3 }} variant="h4" component="div">
                        Travel Agent Registration
                    </Typography>

                    <CardContent>
                        <TextField
                            id="filled-basic"
                            label="Name"
                            variant="filled"
                            sx={{ width: 300, paddingRight: 2 }}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <TextField
                            id="filled-basic"
                            label="NIC No"
                            variant="filled"
                            sx={{ width: 300 }}
                            value={NIC}
                            onChange={(e) => {
                                setNIC(e.target.value)
                            }}
                        />
                    </CardContent>

                    <CardContent>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <div style={{ marginLeft: '5px' }}>
                                <FormLabel>Gender: </FormLabel>
                                <FormControlLabel
                                    sx={{ ml: 1 }}
                                    value="female"
                                    control={<Radio onChange={(e) => {
                                        setGender('female')
                                    }} />}
                                    label="Female"
                                />
                                <FormControlLabel value="male" control={<Radio onChange={(e) => {
                                    setGender('male')
                                }} />} label="Male" />
                            </div>
                        </RadioGroup>
                    </CardContent>

                    <CardContent>
                        <TextField
                            id="filled-basic"
                            label="Email"
                            variant="filled"
                            sx={{ width: 600 }}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </CardContent>

                    <CardContent>
                        <TextField
                            id="filled-basic"
                            label="Contact No"
                            variant="filled"
                            sx={{ width: 600 }}
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                        />
                    </CardContent>

                    <CardContent>
                        <TextField
                            id="filled-basic"
                            label="Address"
                            variant="filled"
                            sx={{ width: 600 }}
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                        />
                    </CardContent>

                    <CardContent>
                        <TextField
                            id="filled-basic"
                            label="Password"
                            variant="filled"
                            type={'password'}
                            sx={{ width: 600 }}
                            value={pwd}
                            onChange={(e) => {
                                setPwd(e)
                            }}
                        />
                    </CardContent>

                    <CardContent>
                        <TextField
                            id="filled-basic"
                            label="Confirm Password"
                            variant="filled"
                            type={'password'}
                            sx={{ width: 600 }}
                            value={confirmPwd}
                            onChange={(e) => {
                                setConfirmPwd(e)
                            }}
                        />
                    </CardContent>

                    <CardContent>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Agree to Terms and Conditions"
                        />
                    </CardContent>
                    <CardContent>
                        <Button onClick={onSubmit} variant="contained" sx={{ width: "100%", height: 40 }}>
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                key={'bottomright'}
            >
                <Alert
                    onClose={handleCloseSnack}
                    severity={severity}
                    sx={{ width: "100%" }}
                    key={vertical + horizontal}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Registration