import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Dashboard from './BackOffice/AdminDashboard';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route >
                    <Route path='/' exact element={<Login />} />
                    <Route path='/signup' exact element={<Registration />} />
                    <Route path='/adminHome' exact element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing