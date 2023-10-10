import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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

const AddSchedule = ({ open, handleClickOpen, handleClose, edit, setEdit, data, setData }) => {
    const [open1, setOpen1] = React.useState(false);

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleClick = () => {
        setOpen1(true);
    };

    return (
        <>
            <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose1} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    The Schedule has been sucessfully added
                </Alert>
            </Snackbar>

            <Button variant="contained" onClick={() => { handleClickOpen(); setEdit(false); setData(null) }} size="medium" startIcon={<AddIcon />}>
                Add Schedule
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {edit ? "Edit Schedule" : "Add Schedule"}
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{
                        trainID: data ? data.trainName : '',
                        from: data ? data.from : '',
                        to: data ? data.to : '',
                        arrivalTime: data ? data.arrivalTime : '',
                        depatureTime: data ? data.depatureTime : '',
                        scheduleStatus: data ? data.scheduleStatus : '',
                    }}
                    validationSchema={Yup.object({
                        trainID: Yup.string()
                            .required('Required'),
                        from: data ? data.from : '',
                        to: data ? data.to : '',
                        arrivalTime: data ? data.arrivalTime : '',
                        depatureTime: data ? data.depatureTime : '',
                        scheduleStatus: data ? data.scheduleStatus : '',

                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)

                    }}
                >
                    {props => (
                        <Form>
                            <DialogContent dividers>
                                <Stack direction="row" spacing={8} alignItems='center'>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Train Name :</FormLabel>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Train Name</InputLabel>
                                        <Select
                                            id="demo-simple-select"
                                            name='trainID'
                                            label="trainID"
                                            value={props.values.trainID}
                                            onChange={props.handleChange}
                                            style={{ width: 258 }}

                                        >
                                            <MenuItem value={"213123"}>Samudra</MenuItem>
                                            <MenuItem value={"4523435"}>Samudra</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Stack>
                                <ErrorMessage name="trainID">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>

                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>From :</FormLabel>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">From</InputLabel>
                                        <Select
                                            id="demo-simple-select"
                                            name='from'
                                            value={props.values.from}
                                            onChange={props.handleChange}
                                            style={{ width: 258 }}

                                        >
                                            <MenuItem value={"213123"}>Samudra</MenuItem>
                                            <MenuItem value={"4523435"}>Samudra</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <ErrorMessage name="from">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>

                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>To :</FormLabel>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">To</InputLabel>
                                        <Select
                                            id="demo-simple-select"
                                            name='to'
                                            value={props.values.to}
                                            onChange={props.handleChange}
                                            style={{ width: 258 }}

                                        >
                                            <MenuItem value={"213123"}>Samudra</MenuItem>
                                            <MenuItem value={"4523435"}>Samudra</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <ErrorMessage name="to">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>

                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Depature Time</FormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            value={props.values.depatureTime}
                                            onChange={value => props.setFieldValue("depatureTime", value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <ErrorMessage name="depatureTime">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>

                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Arrival Time</FormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            value={props.values.arrivalTime}
                                            onChange={value => props.setFieldValue("arrivalTime", value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <ErrorMessage name="arrivalTime">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>


                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Status :</FormLabel>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Schedule status</InputLabel>
                                        <Select
                                            id="demo-simple-select"
                                            name='scheduleStatus'
                                            value={props.values.scheduleStatus}
                                            onChange={props.handleChange}
                                            style={{ width: 258 }}

                                        >
                                            <MenuItem value={"Publish"}>Publish</MenuItem>
                                            <MenuItem value={"Not Published"}>Not Published</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Stack>
                                <ErrorMessage name="trainID">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>

                            </DialogContent>
                            <div style={{ margin: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button autoFocus onClick={handleClose} variant='contained' color="error">
                                        Close
                                    </Button>
                                    <Button type='submit' autoFocus variant='contained'>
                                        {edit ? "Edit Schedule" : "Add Schedule"}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </BootstrapDialog>
        </>
    )
}

export default AddSchedule