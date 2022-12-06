import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Titlebar from './components/Titlebar';
import { WebsiteLock } from './components/WebsiteLock';
import Home from './routes/home/Home';
import Login from './routes/login/Login';
import Token from './routes/login/Token';
import Logout from './routes/logout/Logout';
import Reset from './routes/reset/Reset';
import Archive from './routes/vault/Archive';
import Audit from './routes/vault/Audit';
import Create from './routes/vault/Create';
import Vault from './routes/vault/Vault';

function App() {

    const [locked, setLocked] = React.useState<boolean>(!Boolean(localStorage.getItem('audit')))

    return !locked ? <>
        <Titlebar />
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/token" element={<Token />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/vault" element={<Vault />} />
                <Route path="/vault/create" element={<Create />} />
                <Route path="/vault/archive" element={<Archive />} />
                <Route path="/audit" element={<Audit />} />
                <Route path="/reset" element={<Reset />} />
            </Routes>
        </Router>
    </> : <WebsiteLock onSuccess={() => {
        localStorage.setItem('audit', 'true')
        setLocked(false)
    }} />
}

export default App;
