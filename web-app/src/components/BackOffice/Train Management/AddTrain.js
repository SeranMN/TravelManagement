import React, {useState} from 'react'
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
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

const AddTrain = ({open, handleClickOpen, handleClose, edit, setEdit, data, setData, toggle, setToggle }) => {
    const [open1, setOpen1] = useState(false);
    const [severity, SetSeverity] = useState("");
    const [msg, setMsg] = useState("");

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
            <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose1} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose1} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>

            <Button variant="contained" onClick={() => {handleClickOpen(); setEdit(false); setData(null)}} size="medium" startIcon={<AddIcon />}>
                Add Train
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {edit? "Edit Train": "Add Train"}
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{
                        trainName: data ? data.name : '',
                        seatcount: data ? data.seatCount : '',
                        status: data ? data.status : '',
                    }}
                    validationSchema={Yup.object({
                        trainName: Yup.string()
                            .required('Required'),
                        seatcount: Yup.string()
                            .required('Required'),
                        status: Yup.bool()
                            .required('Required')

                    })}
                    onSubmit={(values) => {
                        if(edit) {
                            console.log(data)
                            const train = {
                                name: values.trainName,
                                seatCount: values.seatcount,
                                status: values.status
                            }
                            axios.put(`http://localhost:5000/api/train/${data.id}`, train)
                            .then(() => {
                                setMsg("The Train has been sucessfully Edited")
                                SetSeverity("success");
                                handleClick()
                                setToggle(!toggle)
                                handleClose()
                            }).catch((err) => {
                                setMsg("oops! Somthing Went Wrong")
                                SetSeverity("error");
                                handleClick()
                            })
                        }
                        else {
                            const train = {
                                name: values.trainName,
                                seatCount: values.seatcount,
                                status: values.status
                            }
                            axios.post('http://localhost:5000/api/train', train)
                            .then(() => {
                                setMsg("The Train has been sucessfully added")
                                SetSeverity("success");
                                handleClick()
                                setToggle(!toggle)
                                handleClose()
                            }).catch((err) => {
                                setMsg("oops! Somthing Went Wrong")
                                SetSeverity("error");
                                handleClick()
                            })
                        }
                     
                    }}
                >
                    {props => (
                        <Form>
                            <DialogContent dividers>
                                <Stack direction="row" spacing={8} alignItems='center'>
                                    <FormLabel sx={{ color: "black" }}>Train name * :</FormLabel>
                                    <TextField name='trainName' onChange={props.handleChange} value={props.values.trainName} style={{ width: 258 }} id="outlined-basic" size="small" label="Train Name*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="trainName">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>

                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black" }}>Seat Count * :</FormLabel>
                                    <TextField type='number' name='seatcount' onChange={props.handleChange} value={props.values.seatcount} style={{ width: 258 }} id="outlined-basic" size="small" label="Seat Count*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="seatcount">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={4} mb={3}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Status :</FormLabel>
                                    <Select
                                        id="demo-simple-select"
                                        name='status'
                                        label="Status"
                                        value={props.values.status}
                                        onChange={props.handleChange}
                                        style={{ width: 258 }}
                                    >
                                        <MenuItem value={true}>Active</MenuItem>
                                        <MenuItem value={false}>Deactive</MenuItem>
                                    </Select>
                                </Stack>
                                <ErrorMessage name="status">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>

                            </DialogContent>
                            <div style={{ margin: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button autoFocus onClick={handleClose} variant='contained' color="error">
                                        Close
                                    </Button>
                                    <Button type='submit' autoFocus variant='contained'>
                                        {edit? "Edit Train" : "Add Train"}
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

export default AddTrain