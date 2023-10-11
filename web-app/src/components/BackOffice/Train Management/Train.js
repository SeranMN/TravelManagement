import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Box } from '@mui/material';
import AddTrain from './AddTrain';
import TrainTable from './TrainTable';

const Train = () => {

    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [data, setData] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


  return (
    <Box sx={{paddingX: 6}}>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <AddTrain open={open} handleClickOpen ={handleClickOpen} handleClose={handleClose} setEdit={setEdit} edit={edit} setData={setData} data= {data} />
        </Box>
        <Box>
            <TrainTable handleClickOpen ={handleClickOpen} setEdit={setEdit} setData={setData}/>
        </Box>

    </Box>
  )
}

export default Train