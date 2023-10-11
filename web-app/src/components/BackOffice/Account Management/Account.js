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
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';


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

  const [open, setOpen] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState(null);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const buses = [
    {
      id: 1,
      trainName: "samudra",
      seatcount: 4,
      description: "Adsasda iouasgbha daibdiad",
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
    setOpen(true)
    setEditStatus(rowData.status)
  }

  return (
    <Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Change Status
        </BootstrapDialogTitle>
        <Formik
                    initialValues={{
                      status: editStatus? editStatus : ''
                    }}
                    validationSchema={Yup.object({
                      status: Yup.string()
                      .required('Required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)

                    }}
                >
                    {props => (
                        <Form>
                            <DialogContent dividers>
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
                                        <MenuItem value={"Active"}>Active</MenuItem>
                                        <MenuItem value={"Deactive"}>Deactive</MenuItem>
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              User ID
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              NIC No
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Name
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Gender
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              City
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Edit
            </TableCell>
            <TableCell align="center" sx={{ color: "#1A2857", fontWeight: "600", fontFamily: 'Proxima-Nova', fontSize: 15 }}>
              Status
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
              <TableCell
                align="center"
              >
                {row.trainName}
              </TableCell>
              <TableCell
                align="center"
              >
                {row.trainName}
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

              <TableCell align="center" sx={{ fontWeight: "700", color: row.status === "Active" ? "green" : "red" }} >
                {row.status}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Account