import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Grid, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from '@mui/icons-material/Close';
import { ShowTrainName } from "../../BackOffice/Schedule Management/ScheduleTable";
import axios from 'axios'
import CancelBooking from './CancelBooking';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditBooking from './EditBooking';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Bookings = () => {
  const sessionID = sessionStorage.getItem('id')
  const [bookings, setBookings] = useState()
  const navigate = useNavigate();
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState()
  const [severity, SetSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const [toggle, setToggle] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      axios.get(`http://localhost:5000/api/reservation/getUpcoming/${sessionID}`)
        .then((res) => {
          setBookings(res.data)
        })
        .catch((err) => console.log(err))
    }
    getBookings()

  }, [toggle])

  const handleDelete = (rowID) => {
    setDeleteModel(true)
    setDeleteId(rowID)
  }

  const handleCloseDelete = () => {
    setDeleteModel(false)
  }

  const handleClick = () => {
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  const handleEdit = (rowData) => {
    setOpen(true)
    setData(rowData)
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{mt: 3}}>
      <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose1} anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}>

        <Alert onClose={handleClose1} severity={severity} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
      {open &&
        <EditBooking handleClose={handleClose} open={open} data={data} setToggle={setToggle} toggle={toggle}
        SetSeverity={SetSeverity} setMsg={setMsg} handleClick={handleClick}/>
      }
      {deleteModel &&
        <CancelBooking handleCloseDelete={handleCloseDelete} deleteModel={deleteModel} bookingId={deleteId} 
        setToggle={setToggle} toggle={toggle} SetSeverity={SetSeverity} setMsg={setMsg} handleClick={handleClick}/>
      }
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
              NIC
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Ticket Count
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Edit
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Cancel
            </TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {bookings && bookings.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
              <TableCell align="center" >{row.travelerID}</TableCell>
              <TableCell align="center" >{row.count}</TableCell>
              <TableCell align="center" >{row.date}</TableCell>

              <TableCell align="center">
                <IconButton
                  aria-label="book"
                  size="medium"
                  color='primary'
                  onClick={() => handleEdit(row)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="book"
                  size="medium"
                  color='error'
                  onClick={() => handleDelete(row.id)}
                >
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Bookings