import { React, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios'

const DeleteAccountModel = ({handleCloseDelete, deleteModel, userId, toggle, 
    setToggle, setMsg, SetSeverity, handleClick}) => {

    const handleDeleteAccount = () => {
        axios.delete(`http://localhost:5000/api/user/${userId}`).then((res) => {
            setToggle(!toggle)
            handleCloseDelete()
            setMsg("Deleted Sucessfully");
            SetSeverity("success");
            handleClick()
        }).catch((err) => {
            console.log(err, "errr")
            setMsg("Oops! Somthing Went Wrong");
            SetSeverity("error");
            handleClick()
        })
    }

    return (
        <div>
            <Dialog
                open={deleteModel}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Please Confirm"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this item? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleCloseDelete}>Cancel</Button>
                    <Button variant='outlined' color='error' onClick={handleDeleteAccount} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteAccountModel