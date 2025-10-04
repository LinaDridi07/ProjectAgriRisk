import React from 'react';

const Notifications: React.FC = () => {
    const notifications = [
        { id: 1, message: 'Reminder: Check the safety protocols for pesticide application.' },
        { id: 2, message: 'Update: New regulations on fertilizer usage have been implemented.' },
        { id: 3, message: 'Alert: Severe weather warning in your area. Please take precautions.' },
    ];

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
