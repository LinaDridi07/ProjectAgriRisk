import React, { useState, useEffect } from 'react';

const Scheduler: React.FC = () => {
    const [tasks, setTasks] = useState<{ date: string; task: string; danger: boolean }[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [dangerAlerts, setDangerAlerts] = useState<string[]>([]);

    useEffect(() => {
        // Fetch tasks from an API or local storage
        const fetchTasks = async () => {
            // Example data fetching logic
            const fetchedTasks = [
                { date: '2023-10-01', task: 'Inspect pesticide storage', danger: true },
                { date: '2023-10-02', task: 'Attend safety training', danger: false },
            ];
            setTasks(fetchedTasks);
        };

        fetchTasks();
    }, []);

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        const alerts = tasks
            .filter(task => task.date === date && task.danger)
            .map(task => task.task);
        setDangerAlerts(alerts);
    };

    return (
        <div>
            <h2>Task Scheduler</h2>
            <div>
                <h3>Select a Date</h3>
                <div>
                    {Array.from(new Set(tasks.map(task => task.date))).map(date => (
                        <button key={date} onClick={() => handleDateClick(date)}>
                            {date}
                        </button>
                    ))}
                </div>
            </div>
            {selectedDate && (
                <div>
                    <h3>Tasks for {selectedDate}</h3>
                    <ul>
                        {tasks
                            .filter(task => task.date === selectedDate)
                            .map((task, index) => (
                                <li key={index} style={{ color: task.danger ? 'red' : 'black' }}>
                                    {task.task}
                                </li>
                            ))}
                    </ul>
                    {dangerAlerts.length > 0 && (
                        <div>
                            <h4>Danger Alerts:</h4>
                            <ul>
                                {dangerAlerts.map((alert, index) => (
                                    <li key={index}>{alert}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Scheduler;
