import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import HomePage from './components/Home/HomePage';
import Scheduler from './components/Scheduling/Scheduler';
import Chatbot from './components/Chatbot/Chatbot';
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/scheduler" component={Scheduler} />
        <Route path="/chatbot" component={Chatbot} />
      </Switch>
    </Router>
  );
};

export default App;
