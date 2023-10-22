import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteTrainModel from "./DeleteTrainModel";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TrainTable = ({handleClickOpen, setEdit, setData, toggle, setToggle }) => {
    const [trains, setTrains] = useState()
    const [deleteModel, setDeleteModel] = useState(false);
    const [deleteId, setDeleteId] = useState()
    const [open1, setOpen1] = useState(false);
    const [severity, SetSeverity] = useState("");
    const [msg, setMsg] = useState("");

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
   
    }, [toggle])

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen1(false);
      };
    
      const handleClick = () => {
        setOpen1(true);
      };
    

    const handleEdit = (rowData) => {
        handleClickOpen();
        setEdit(true)
        setData(rowData)
    }

    const handleDelete = (rowID) => {
        setDeleteModel(true)
        setDeleteId(rowID)
    }

    const handleCloseDelete = () => {
        setDeleteModel(false)
    }

    return (
        <Box>
            <Grid container sx={{ mb: 4 }}>
                <Grid item xs={12} md={10} lg={10}>
                    <Typography sx={{
                        fontSize: "22px",
                        fontWeight: "600",
                        mt: 3,
                        textAlign: 'left'
                    }}>
                        Listed Trains
                    </Typography>
                </Grid>
            </Grid>
            <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose1} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose1} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>

            {deleteModel &&
                <DeleteTrainModel handleCloseDelete={handleCloseDelete} deleteModel={deleteModel} trainId={deleteId}
                    setToggle={setToggle} toggle={toggle} SetSeverity={SetSeverity} setMsg={setMsg} handleClick={handleClick} />
            }

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Train Name
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Seat Count
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Edit
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Delete
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {trains && trains.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.name}
                            </TableCell>
                            <TableCell align="center" >{row.seatCount}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "500", fontFamily: "Proxima-Nova" }}>
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    color="primary"
                                    onClick={() => handleEdit(row)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: "500", fontFamily: "Proxima-Nova" }}>
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    color="error"
                                    onClick={() => handleDelete(row.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center" sx={{fontWeight: "500", color: row.status === true ? "green" : "red"}} >
                                {row.status === true ? "Acive" : "Deactive"}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default TrainTable