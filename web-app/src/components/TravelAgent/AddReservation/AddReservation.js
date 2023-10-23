import { React, useState, useEffect, forwardRef } from "react";
import { useParams } from 'react-router-dom'
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import dayjs from 'dayjs';

import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar"

const thirtyDays = dayjs().add(30, 'day');

const AddReservation = () => {
    const { id } = useParams();
    const vertical = 'bottom'
    const horizontal = 'right'
    const [train, setTrain] = useState("")
    const [trainName, setTrainName] = useState()
    const [severity, SetSeverity] = useState("");
    const [msg, setMsg] = useState("");
    const sessionID = sessionStorage.getItem('id')


    const [openSnack, setOpenSnack] = useState(false);

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnack(false);
    };

    useEffect(() => {
        const getTrain = async () => {
            axios.get(`http://localhost:5000/api/schedule/${id}`)
                .then((res) => {
                    setTrain(res.data)

                    const getTrain = async () => {
                        await axios.get(`http://localhost:5000/api/train/${res.data.trainId}`)
                            .then((res) => {
                                setTrainName(res.data.name)
                                console.log('res.data', res.data)
                            })
                            .catch((err) => console.log(err))
                    }
                    getTrain()
                })
                .catch((err) => console.log(err))
        }
        getTrain()
    }, [id])

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Box sx={{ width: 300, backgroundColor: '#e0e0e0', boxShadow: 3, mt: 5 }}>
                <Stack m={2} direction="row" >
                    <Typography>Train Name : </Typography>{trainName && trainName}
                </Stack>
                <Stack m={2} direction="row" >
                    <Typography>From : {train && train.start}</Typography>
                </Stack>
                <Stack m={2} direction="row" >
                    <Typography>To : {train && train.end}</Typography>
                </Stack>
                <Stack m={2} direction="row" >
                    <Typography>Arrival Time : {train && train.arivingTime}</Typography>
                </Stack>
                <Stack m={2} direction="row" >
                    <Typography>Depature Time : {train && train.depatureTime}</Typography>
                </Stack>

            </Box>
            <Box
                component="span"
                sx={{
                    transform: "scale(1.0)",
                    backgroundColor: "white",
                    display: 'flex',
                    alignItems: 'center',
                    mt: 5
                }}
            >
                <Card sx={{ width: 650, backgroundColor: '#e0e0e0', boxShadow: 5 }}>
                    <Typography sx={{ mb: 3, textAlign: 'center', mt: 3 }} variant="h4" component="div">
                        Book Tickets for travelers
                    </Typography>
                    <Formik
                        initialValues={{
                            NIC: '',
                            trainID: '',
                            count: '',
                            date: ''

                        }}
                        validationSchema={Yup.object({
                            NIC: Yup.string()
                                .required('Required'),
                            count: Yup.string()
                                .required('Required'),
                            date: Yup.string()
                                .required('Required'),

                        })}
                        onSubmit={(values) => {
                            const dateObject = new Date(values.date.$d);
                            const formattedDate = dayjs(dateObject).format('DD/MM/YYYY');
                            console.log(formattedDate)

                            const reservation = {
                                travelerID: values.NIC,
                                trainID: train.trainId,
                                scheduleID:train.id,
                                arivingTime: train.arivingTime,
                                depatureTime: train.depatureTime,
                                from: train.start,
                                to: train.end,
                                count: values.count,
                                date: formattedDate,
                                createdBy: sessionID
                            }
                            axios.post('http://localhost:5000/api/reservation', reservation)
                                .then(() => {
                                    // setMsg("The Train has been sucessfully added")
                                    // SetSeverity("success");
                                    // handleClick()
                                    // setToggle(!toggle)
                                    // handleClose()
                                }).catch((err) => {
                                    // setMsg("oops! Somthing Went Wrong")
                                    // SetSeverity("error");
                                    // handleClick()
                                })
                        }}
                    >
                        {props => (
                            <Form>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box>
                                        <TextField
                                            size="medium"
                                            id="NIC"
                                            name="NIC"
                                            label="NIC No*"
                                            variant="outlined"
                                            value={props.values.NIC}
                                            style={{ width: 400, marginBottom: 4 }}
                                            onChange={props.handleChange}
                                        />
                                        <ErrorMessage name="NIC">
                                            {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                        </ErrorMessage>
                                    </Box>

                                    <Box sx={{ marginTop: 2 }}>
                                        <FormControl style={{ width: 400, marginBottom: 4 }}>
                                            <InputLabel htmlFor="demo-simple-select">Passenger Count*</InputLabel>
                                            <Select
                                                id="demo-simple-select"
                                                name='count'
                                                label="Passenger Count*"
                                                value={props.values.count}
                                                onChange={props.handleChange}
                                                style={{ width: 400, marginBottom: 4 }}
                                            >
                                                <MenuItem value={"1"}>1</MenuItem>
                                                <MenuItem value={"2"}>2</MenuItem>
                                                <MenuItem value={"3"}>3</MenuItem>
                                                <MenuItem value={"4"}>4</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <ErrorMessage name="count">
                                            {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                        </ErrorMessage>
                                    </Box>

                                    <Box sx={{ marginTop: 2 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    sx={{ width: 400, marginBottom: 4 }}
                                                    label="Date"
                                                    disablePast
                                                    maxDate={thirtyDays}
                                                    value={props.values.date}
                                                    onChange={(value) => props.setFieldValue("date", value)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <ErrorMessage name="date">
                                            {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                        </ErrorMessage>
                                    </Box>

                                    <CardContent>
                                        <Button type='submit' variant="contained" >
                                            Submit
                                        </Button>
                                    </CardContent>
                                </Box>
                            </Form>)}
                    </Formik>
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

export default AddReservation