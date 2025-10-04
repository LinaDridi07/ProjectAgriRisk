import React from 'react';

const Alerts: React.FC = () => {
    const alerts = [
        { id: 1, message: 'Warning: Pesticide X is hazardous to health. Use protective gear.' },
        { id: 2, message: 'Alert: Fertilizer Y has been recalled due to contamination.' },
        { id: 3, message: 'Notice: Equipment Z may pose safety risks if not handled properly.' },
    ];

    return (
        <div className="alerts">
            <h2>Alerts</h2>
            <ul>
                {alerts.map(alert => (
                    <li key={alert.id}>{alert.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Alerts;
