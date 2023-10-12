import React, {useEffect} from 'react'
import { Box, Button, IconButton, Grid, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios'

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

const EditUsers = ({open, handleClose, data, toggle, setToggle, setMsg, SetSeverity, handleClick}) => {

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Edit User
            </BootstrapDialogTitle>
            <Formik
                initialValues={{
                    NIC: data && data.id,
                    name: data && data.name,
                    email: data && data.email,
                    phoneNumber: data && data.phoneNumber,
                    role: data && data.role,
                    gender: data && data.gender,
                    address: data ? data.address : '',
                    status: data && data.status,
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                    .required('Required'),
                    status: Yup.string()
                        .required('Required')
                })}
                onSubmit={(values) => {
                    const user = {
                        id: values.NIC,
                        name: values.name,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                        gender: values.gender,
                        address: values.address,
                        role: values.role,
                        status: values.status
                    }
                    axios.put(`http://localhost:5000/api/user/${values.NIC}`, user)
                    .then(() => {
                        setMsg("The User has been sucessfully Edited")
                        SetSeverity("success");
                        handleClick()
                        setToggle(!toggle)
                        handleClose()
                    }).catch((err) => {
                        setMsg("oops! Somthing Went Wrong")
                        SetSeverity("error");
                        handleClick()
                    })
                }}
            >
                {props => (
                    <Form>
                        <DialogContent dividers>
                            <Stack direction="row" spacing={8} alignItems='center'>
                                <FormLabel sx={{ color: "black", minWidth: '80px' }}>NIC No :</FormLabel>
                                <TextField disabled name='NIC' onChange={props.handleChange} value={props.values.NIC} style={{ width: 258 }} id="outlined-basic" size="small" variant="outlined" />
                            </Stack>

                            <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                <FormLabel sx={{ color: "black", minWidth: '80px' }}>Name :</FormLabel>
                                <TextField name='name' onChange={props.handleChange} value={props.values.name} style={{ width: 258 }} id="outlined-basic" size="small"  variant="outlined" />
                            </Stack>
                            <ErrorMessage name="name">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>


                            <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                <FormLabel sx={{ color: "black", minWidth: '80px' }}>Role :</FormLabel>
                                <TextField disabled name='role' onChange={props.handleChange} value={props.values.role} style={{ width: 258 }} id="outlined-basic" size="small" variant="outlined" />
                            </Stack>

                            <Stack direction="row" spacing={7} alignItems='center' mt={4}>
                                <FormLabel sx={{ color: "black", minWidth: '80px' }}>Contact No :</FormLabel>
                                <TextField name='phoneNumber' onChange={props.handleChange} value={props.values.phoneNumber} style={{ width: 258 }} id="outlined-basic" size="small"  variant="outlined" />
                            </Stack>

                            <Stack direction="row" spacing={8} alignItems='center' mt={4} mb={3}>
                                <FormLabel sx={{ color: "black", minWidth: '80px' }}>Gender :</FormLabel>
                                <Select
                                    id="demo-simple-select"
                                    name='gender'
                                    value={props.values.gender}
                                    onChange={props.handleChange}
                                    style={{ width: 258 }}
                                >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                </Select>
                            </Stack>

                            <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                <FormLabel sx={{ color: "black", minWidth: '80px' }}>Address :</FormLabel>
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        name='address'
                                        onChange={props.handleChange}
                                        value={props.values.address}
                                        minRows={3}
                                        placeholder="Address"
                                        style={{ width: 258}}
                                    />
                            </Stack>

                            <Stack direction="row" spacing={8} alignItems='center' mt={4} mb={3}>
                                <FormLabel sx={{ color: "black", minWidth: '80px' }}>Status :</FormLabel>
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
                                    Change
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </BootstrapDialog>
    )
}

export default EditUsers