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

const ScheduleTable = ({handleClickOpen, setEdit, setData }) => {

    const buses = [
        {
            id: 1,
            trainName: "samudra",
            from: "abbbb",
            to: "Aasdad",
            arrivalTime: '3. 00',
            status: "Active"
        },
        {
            id: 2,
            trainName: "samudra",
            seatcount: 4,
            description: "Adsasda iouasgbha daibdiad",
            status: "Active"
        },
        {
            id: 3,
            trainName: "samudra",
            seatcount: 4,
            description: "Adsasda iouasgbha daibdiad",
            status: "Deactive"
        },
        {
            id: 4,
            trainName: "samudra",
            seatcount: 4,
            description: "Adsasda iouasgbha daibdiad",
            status: "Deactive"
        }
    ]

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
                            Edit
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Schedule Status
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {buses.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                             <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.id}
                            </TableCell>
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.trainName}
                            </TableCell>
                            <TableCell align="center" >{row.seatcount}</TableCell>
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
                            <TableCell align="center" sx={{fontWeight: "700", color: row.status === "Active" ? "green" : "red"}} >
                                {row.status}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default ScheduleTable