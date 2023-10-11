import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrainIcon from '@mui/icons-material/Train';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch } from 'react-redux';
import { setView } from '../../store/reducers/containerReducer';

const MainListItems = ({ setHeader }) => {
    const dispatch = useDispatch()

    return (
        <>
            <ListItemButton onClick={() => {
                setHeader("Dashboard")
                dispatch(setView('AdminHome'))
            }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText sx={{ml: '-8px'}} primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={() => {
                setHeader("Train Management")
                dispatch(setView('TrainManagement'))

            }}>
                <ListItemIcon>
                    <TrainIcon />
                </ListItemIcon>
                <ListItemText sx={{ml: '-8px'}} primary="Train Management" />
            </ListItemButton>

            <ListItemButton onClick={() => {
                setHeader("Schedule Management")
                dispatch(setView('ScheduleManagement'))
            }}>
                <ListItemIcon>
                    <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText sx={{ml: '-8px'}} primary="Schedule Management" />
            </ListItemButton>

            <ListItemButton onClick={() => {
                setHeader("Accounts Management")
                dispatch(setView('AccountManagement'))
            }}>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText sx={{ml: '-8px'}} primary="Accounts Management" />
            </ListItemButton>

        </>
    )
}

export default MainListItems
