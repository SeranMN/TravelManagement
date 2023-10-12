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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import axios from 'axios'
import EditUsers from "./EditUsers";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteAccountModel from "./DeleteAccountModel";

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

const Account = () => {

  const [open, setOpen] = useState(false);
  const [editStatus, setEditStatus] = useState(null);
  const [data, setData] = useState(null);
  const [users, setUsers] = useState()
  const [toggle, setToggle] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [severity, SetSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState()

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  const handleClick = () => {
    setOpen1(true);
  };

  useEffect(() => {
    const getUsers = async () => {
      await axios.get('http://localhost:5000/api/user')
        .then((res) => {
          setUsers(res.data)
          console.log('res.data', res.data)
        })
        .catch((err) => console.log(err))
    }
    getUsers()

  }, [toggle])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (rowData) => {
    setOpen(true)
    setEditStatus(rowData.status)
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
            textAlign: 'center'
          }}>
            Listed Users
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
      {open &&
        <EditUsers handleClose={handleClose} open={open} data={data} setToggle={setToggle} toggle={toggle}
          SetSeverity={SetSeverity} setMsg={setMsg} handleClick={handleClick} />
      }
      {deleteModel &&
        <DeleteAccountModel handleCloseDelete={handleCloseDelete} deleteModel={deleteModel} userId={deleteId} 
        setToggle={setToggle} toggle={toggle} SetSeverity={SetSeverity} setMsg={setMsg} handleClick={handleClick}/>
      }
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              NIC No
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Name
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Role
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Email
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Contact No
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Gender
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Address
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
          {users && users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
              >
                {row.id.toUpperCase()}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                align="center"
              >
                {row.name}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                align="center"
              >
                {row.role}
              </TableCell>
              <TableCell align="center">
                {row.email}
              </TableCell>
              <TableCell align="center">
                {row.phoneNumber}
              </TableCell>
              <TableCell
                align="center"
              >
                {row.gender}
              </TableCell>
              <TableCell
                align="center"
              >
                {row.address}
              </TableCell>
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

              <TableCell align="center" sx={{ fontWeight: "600", color: row.status === true ? "green" : "red" }} >
                {row.status === true ? "Acive" : "Deactive"}
              </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Account