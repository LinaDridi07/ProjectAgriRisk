import React from 'react';
import Alerts from './Alerts';
import Notifications from './Notifications';
import Navbar from '../Shared/Navbar';

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <h1>Welcome to the Agri Risk Management Dashboard</h1>
            <Notifications />
            <Alerts />
        </div>
    );
};

export default HomePage;
