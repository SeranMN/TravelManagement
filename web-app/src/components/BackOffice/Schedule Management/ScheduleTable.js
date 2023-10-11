import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import axios from 'axios';

export const ShowTrainName = ({trainId}) => {
    const [trainName, setTrainName] = useState()

    useEffect(() => {
        console.log("trainId", trainId)
        const getTrain = async () => {
            axios.get(`http://localhost:5000/api/train/${trainId}`)
            .then((res) => { 
              setTrainName(res.data.name) 
              console.log('res.data',res.data)
            })
            .catch((err) => console.log(err))
        }
        getTrain()
    }, [])

    return (
        <>
            {trainName}
        </>
    )
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        minWidth: '400px'
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


const ScheduleTable = ({handleClickOpen, setEdit, setData, toggle }) => {

    const [schedule, setSchedule] = useState()
    const [viewStations, setViewStations] = React.useState(false);
    const [stations, setStations] = React.useState(false);

    useEffect(() => {
        const getTrains = async () => {
            axios.get('http://localhost:5000/api/schedule')
            .then((res) => { 
              setSchedule(res.data) 
              console.log('res.data',res.data)
            })
            .catch((err) => console.log(err))
        }
        getTrains()
   
    }, [toggle])

    const handleViewStations = (data) => {
        setViewStations(true);
        setStations(data)
    };

    const handleCloseStations = () => {
        setViewStations(false);
    };

    const handleEdit = (rowData) => {
        handleClickOpen();
        setEdit(true)
        setData(rowData)
    }

    return (
        <Box>
            <Grid container sx={{ mb: 4 }}>
                <Grid item xs={12} md={10} lg={10}>
                    <Typography sx={{
                        fontSize: "22px",
                        fontWeight: "600",
                        mt: 3,
                        textAlign: 'center'
                    }}>
                        Listed Schedule
                    </Typography>
                </Grid>
            </Grid>

            <BootstrapDialog
                onClose={handleCloseStations}
                aria-labelledby="customized-dialog-title"
                open={viewStations}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseStations}>
                    Intermediate Stations
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {stations && stations.map((station) => (
                        <>
                            <Chip
                                key={station}
                                label={station}
                                sx={{ml: 2, mt: 0.8}}
                            />
                        </>
                    ))}
                </DialogContent>

            </BootstrapDialog>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Train Name
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            From
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            To
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Arrival Time
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Depature Time
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            View Intermediate Stations
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Edit
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Schedule Status
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {schedule && schedule.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                             <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                <ShowTrainName trainId ={row.trainId}/>
                            </TableCell>
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.start}
                            </TableCell>
                            <TableCell align="center" >{row.end}</TableCell>
                            <TableCell align="center" >{row.arivingTime}</TableCell>
                            <TableCell align="center" >{row.depatureTime}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    aria-label="delete"
                                    size="medium"
                                    onClick={() => handleViewStations(row.intermediate)}
                                >
                                    <RemoveRedEyeIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "500", fontFamily: "Proxima-Nova" }}>
                                <IconButton
                                    aria-label="delete"
                                    size="medium"
                                    color="primary"
                                    onClick={() => handleEdit(row)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center" sx={{fontWeight: "500", color: row.status === true ? "green" : "red"}} >
                                {row.status === true ? "Published" : "Not Published"}

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default ScheduleTable