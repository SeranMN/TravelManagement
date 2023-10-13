import React, { useState, useEffect } from 'react'
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ShowTrainName } from "../../BackOffice/Schedule Management/ScheduleTable";
import axios from 'axios'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewHistory = () => {

    const [bookings, setBookings] = useState()

    useEffect(() => {
        const getBookings = async () => {
            axios.get(`http://localhost:5000/api/reservation/getHistory/${"992511273v"}`)
                .then((res) => {
                    console.log("res.data", res.data)
                    setBookings(res.data)
                })
                .catch((err) => console.log(err))
        }
        getBookings()

    }, [])

    return (
        <Box sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            NIC
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Ticket Count
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Date
                        </TableCell>
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

                    </TableRow>
                </TableHead>

                <TableBody>
                    {bookings && bookings.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="center" >{row.travelerID}</TableCell>
                            <TableCell align="center" >{row.count}</TableCell>
                            <TableCell align="center" >{row.date}</TableCell>
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                <ShowTrainName trainId={row.trainID} />
                            </TableCell>
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.from}
                            </TableCell>
                            <TableCell align="center" >{row.to}</TableCell>
                            <TableCell align="center" >{row.arivingTime}</TableCell>
                            <TableCell align="center" >{row.depatureTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default ViewHistory