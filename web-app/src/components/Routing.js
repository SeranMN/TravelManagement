import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Dashboard from './BackOffice/AdminDashboard';
import Header from './TravelAgent/Header';
import TravelAgenHome from './TravelAgent/TravelAgenHome';
import Reservation from './TravelAgent/AddReservation/Reservation';
import Bookings from './TravelAgent/ViewBookings/Bookings';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route >
                    <Route path='/' exact element={<Login />} />
                    <Route path='/signup' exact element={<Registration />} />
                    <Route path='/adminHome' exact element={<Dashboard />} />
                </Route>
                <Route element={<Header />}>
                    <Route path='/tavelAgentHome' exact element={<TravelAgenHome />} />
                    <Route path='/addreservation' exact element={<Reservation />} />
                    <Route path='/viewBookings' exact element={<Bookings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing