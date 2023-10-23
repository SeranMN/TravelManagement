import { React, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const DeactivateAccountModel = ({handleCloseDeActivate, deactivate, userId}) => {

    let navigate = useNavigate()

    const handleDeActivateAccount = () => {
        axios.put(`http://localhost:5000/api/user/deactivate/${userId}`).then((res) => {
            handleCloseDeActivate()
            navigate("/")
        }).catch((err) => {
            console.log(err, "errr")
       
        })
    }

    return (
        <div>
            <Dialog
                open={deactivate}
                onClose={handleCloseDeActivate}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Please Confirm"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to Deactivate your account? 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleCloseDeActivate}>Cancel</Button>
                    <Button variant='outlined' color='error' onClick={handleDeActivateAccount} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeactivateAccountModel