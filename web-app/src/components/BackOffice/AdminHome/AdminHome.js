import React,{useState} from 'react'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const AdminHome = () => {

    return (
        <>
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div style={{ width: '100%', textAlign: 'center', backgroundColor: '#9e9e9e', fontSize: '20px', fontWeight: 'bold' }}>
                        Upcoming Events
                    </div>

                </Paper>
            </Grid>
        </>
    )
}

export default AdminHome