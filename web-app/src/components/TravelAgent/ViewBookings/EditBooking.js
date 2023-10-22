import React, { useEffect } from 'react'
import { Box, Button, IconButton, Grid, CardContent } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel'; import axios from 'axios'
import dayjs from 'dayjs';

const thirtyDays = dayjs().add(30, 'day');

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const EditBooking = ({ open, handleClose, data, toggle, setToggle, setMsg, SetSeverity, handleClick }) => {
    const sessionID = sessionStorage.getItem('id')

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle  id="customized-dialog-title" onClose={handleClose}>
                Edit Booking
            </BootstrapDialogTitle>
            <Formik
                initialValues={{
                    NIC: data ? data.travelerID : '',
                    count: data ? data.count : '',
                    date: data ? dayjs(data.date.split('/').reverse().join('-')) : ''
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
                        trainID: data.trainID,
                        arivingTime: data.arivingTime,
                        depatureTime: data.depatureTime,
                        from: data.from,
                        to: data.to,
                        count: values.count,
                        date: formattedDate,
                        createdBy: sessionID
                    }
                    axios.put(`http://localhost:5000/api/reservation/${data.id}`, reservation)
                        .then(() => {
                            setMsg("The Reservation has been sucessfully edited")
                            SetSeverity("success");
                            handleClick()
                            setToggle(!toggle)
                            handleClose()
                        }).catch((err) => {
                            if (err.response && err.response.status === 400) {
                                setMsg(err.response.data);
                                SetSeverity("error");
                                handleClick();
                            } else {
                                setMsg("oops! Somthing Went Wrong");
                                SetSeverity("error");
                                handleClick();
                            }
                        })
                }}
            >
                {props => (
                    <Form>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2 }}>
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
                                <Button type='Edit' variant="contained" >
                                    Submit
                                </Button>
                            </CardContent>
                        </Box>
                    </Form>
                )}
            </Formik>
        </BootstrapDialog>
    )
}

export default EditBooking