import React, { useState } from 'react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add authentication logic here
        if (email === '' || password === '') {
            setError('Please fill in all fields');
            return;
        }
        // Simulate an API call
        try {
            // Replace with actual API call
            const response = await fakeApiLogin(email, password);
            if (response.success) {
                // Handle successful login
                console.log('Login successful');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const fakeApiLogin = (email: string, password: string) => {
        return new Promise<{ success: boolean }>((resolve) => {
            setTimeout(() => {
                resolve({ success: email === 'test@example.com' && password === 'password' });
            }, 1000);
        });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
