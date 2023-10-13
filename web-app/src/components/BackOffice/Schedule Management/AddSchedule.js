import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CancelIcon from "@mui/icons-material/Cancel";
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

const AddSchedule = ({ open, handleClickOpen, handleClose, edit, setEdit, data, setData, toggle, setToggle }) => {
    const [open1, setOpen1] = useState(false);
    const [severity, SetSeverity] = useState("");
    const [msg, setMsg] = useState("");
    const [trains, setTrains] = useState()

    const stations = [
        "Fort", "Secretartat Halt", "Kompnnavidiya", "Kollupitiya", "Bambalapitiya", "Wellawatte", "Dehiwala", "Mount Laviniya",
        "Rathmalana", "Angulana", "Lunawa", "Moratuwa", "Koralawella", "Egodauyana", "Panadura", "Pinwatte", "Wadduwa", "Train Halt 01",
        "Kalutara North", "Kaluthara South", "Katukurunda", "Payagala North", "Payagala South", "Maggona", "Beruwala", "Hettimulla", "Aluthgama",
        "Bentota", "Induruwa", "Mha Induruwa", "Kosgoda", "Piyagama", "Ahungalle", "Patagamgoda", "Balapitiya", "Andadola", "Kandegoda",
        "Ambalangoda", "Madampagama", "Akurala", "Kahawa", "Telwatte", "Seenigama", "Hikkaduwa", "Thiranagama", "Kumarakanda", "Dodanduwa",
        "Rathgama", "Boossa", "Ginthota", "Piyadigama", "Richmond Hill", "Galle", "Katugoda", "Unawatuna", "Taple", "Habaraduwa", "Koggala",
        "Kathaluwa", "Ahangama", "Midigama", "Kumbalgama", "Weligama", "Polwathumodara", "Mirissa", "Kamburugamuwa", "Walgama", "Matara", "Piliduwa"
    ];

    useEffect(() => {
        const getTrains = async () => {
            axios.get('http://localhost:5000/api/train')
            .then((res) => { 
              setTrains(res.data) 
              console.log('res.data',res.data)
            })
            .catch((err) => console.log(err))
        }
        getTrains()
   
    }, [])

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleClick = () => {
        setOpen1(true);
    };

    const handlIntermediate = (e) => {

    }

    const validationForCreate = Yup.object({
        trainID: Yup.string()
            .required('Required'),
        from: Yup.string()
            .required('Required'),
        to: Yup.string()
            .required('Required'),
        arrivalTime: Yup.string()
            .required('Required'),
        depatureTime: Yup.string()
            .required('Required'),
        scheduleStatus: Yup.string()
            .required('Required'),
    })

    const validationForUpdate = Yup.object({
        trainID: Yup.string()
            .required('Required'),
        from: Yup.string()
            .required('Required'),
        to: Yup.string()
            .required('Required'),
        scheduleStatus: Yup.string()
            .required('Required'),
    })

    return (
        <>
            <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose1} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose1} severity={severity} sx={{ width: '100%' }}>
                    {msg}
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
                        trainID: data ? data.trainId : '',
                        from: data ? data.start : '',
                        to: data ? data.end : '',
                        intermediate: data ? data.intermediate : [],
                        arrivalTime: data ? data.arivingTime : '',
                        depatureTime: data ? data.depatureTime : '',
                        scheduleStatus: data ? data.status : '',
                    }}
                    validationSchema={ !edit ?  validationForCreate : validationForUpdate}
                    onSubmit={(values) => {
                        console.log(values)
                 
                        if (edit) {
                            console.log(data)
                            const schedule = {
                                trainId: values.trainID,
                                start: values.from,
                                end: values.to,
                                arivingTime: values.arrivalTime,
                                depatureTime: values.depatureTime,
                                intermediate: values.intermediate,
                                status: values.scheduleStatus
                            }
                            axios.put(`http://localhost:5000/api/schedule/${data.id}`, schedule)
                                .then(() => {
                                    setMsg("The Schedule has been sucessfully Edited")
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
                        }
                        else {
                            const ahours = values.arrivalTime.$d.getHours();
                            const aminutes = values.arrivalTime.$d.getMinutes();
                            const aformattedHours = ahours % 12 || 12;
                            const arrivalampm = ahours >= 12 ? 'P.M.' : 'A.M.';
    
                            const dhours = values.depatureTime.$d.getHours();
                            const dminutes = values.depatureTime.$d.getMinutes();
                            const dformattedHours = dhours % 12 || 12;
                            const depatureampm = dhours >= 12 ? 'P.M.' : 'A.M.';
    
                            const arrivalTime = `${aformattedHours}:${aminutes} ${arrivalampm}`
                            const depatureTime = `${dformattedHours}:${dminutes} ${depatureampm}`
                            
                            const schedule = {
                                trainId: values.trainID,
                                start: values.from,
                                end: values.to,
                                arivingTime: arrivalTime,
                                depatureTime: depatureTime,
                                intermediate: values.intermediate,
                                status: values.scheduleStatus
                            }
                            axios.post('http://localhost:5000/api/schedule', schedule)
                                .then(() => {
                                    setMsg("The Schedule has been sucessfully added")
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
                                            MenuProps={{
                                                sx: {
                                                  height: 300,
                                                },
                                            }}

                                        >
                                            {trains && trains?.map((train , index) => (
                                                <MenuItem key={index} value={train.id}>
                                                    {train.name}
                                                </MenuItem>
                                            ))}
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
                                            MenuProps={{
                                                sx: {
                                                  height: 300,
                                                },
                                            }}
                                        >
                                            {stations && stations?.map((st , index) => (
                                                <MenuItem key={index} value={st}>
                                                    {st}
                                                </MenuItem>
                                            ))}
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
                                            MenuProps={{
                                                sx: {
                                                  height: 300,
                                                },
                                            }}

                                        >
                                            {stations && stations?.map((st, index) => (
                                                <MenuItem key={index} value={st}>
                                                    {st}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <ErrorMessage name="to">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>

                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Intermediate Stations:</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            id="demo-simple-select"
                                            name='to'
                                            multiple
                                            value={props.values.intermediate}
                                            onChange={(e) => props.setFieldValue("intermediate", e.target.value)}
                                            style={{ width: 258 }}
                                            renderValue={(selected) => (
                                                <Stack gap={1} direction="row" flexWrap="wrap">
                                                  {selected.map((value) => (
                                                      <Chip
                                                          key={value}
                                                          label={value}
                                                          onDelete={() =>
                                                            props.setFieldValue("intermediate", props.values.intermediate.filter((item) => item !== value ))
                                                          }
                                                          deleteIcon={
                                                              <CancelIcon
                                                                  onMouseDown={(event) => event.stopPropagation()}
                                                              />
                                                          }
                                                      />
                                                  ))}
                                                </Stack>
                                            )}
                                            MenuProps={{
                                                sx: {
                                                  height: 300,
                                                },
                                            }}
                                        >
                                            {stations && stations?.map((st, index) => (
                                                <MenuItem key={index} value={st}>
                                                    {st}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>

                                {!edit &&
                                    <>
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
                                    </>
                                }

                                {!edit &&
                                    <>
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
                                    </>
                                }

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
                                            <MenuItem value={true}>Publish</MenuItem>
                                            <MenuItem value={false}>Not Published</MenuItem>
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