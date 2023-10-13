import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { IconButton} from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import BookIcon from '@mui/icons-material/Book';
import { Chip } from '@mui/material';
import { ShowTrainName } from "../../BackOffice/Schedule Management/ScheduleTable";


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


const AvalaibleTrainsTable = ({ searchResults }) => {

    const navigate = useNavigate();
    const [viewStations, setViewStations] = useState(false);
    const [stations, setStations] = useState(false);

    const handleViewStations = (data) => {
        setViewStations(true);
        setStations(data)
    };

    const handleCloseStations = () => {
        setViewStations(false);
    };

    const handleBook = (id) => {
        navigate(`/viewTrain/${id}`)
    };

    return (
        <>
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
                                sx={{ ml: 2, mt: 0.8 }}
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
                             Intermediate Stations
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
                            Book
                        </TableCell>
                        
                    </TableRow>
                </TableHead>

                <TableBody>
                    {searchResults && searchResults.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                <ShowTrainName trainId={row.trainId} />
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
                            <TableCell align="center">
                                <IconButton
                                    aria-label="book"
                                    size="medium"
                                    onClick={() => handleBook(row.id)}
                                >
                                    <BookIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default AvalaibleTrainsTable