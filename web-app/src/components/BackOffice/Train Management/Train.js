import React from 'react'
import { Box } from '@mui/material';
import AddTrain from './AddTrain';
import TrainTable from './TrainTable';

const Train = () => {

    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [toggle, setToggle] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


  return (
    <Box sx={{paddingX: 6}}>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <AddTrain open={open} handleClickOpen ={handleClickOpen} handleClose={handleClose}
             setEdit={setEdit} edit={edit} setData={setData} data= {data} setToggle= {setToggle} toggle={toggle} />
        </Box>
        <Box>
            <TrainTable handleClickOpen ={handleClickOpen} setEdit={setEdit} setData={setData} toggle= {toggle}/>
        </Box>

    </Box>
  )
}

export default Train