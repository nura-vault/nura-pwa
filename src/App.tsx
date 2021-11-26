import TitleBar from 'frameless-titlebar';
import isElectron from 'is-electron';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/home/Home';
import Login from './routes/login/Login';
import Token from './routes/login/Token';
import Logout from './routes/logout/Logout';
import Archive from './routes/vault/Archive';
import Audit from './routes/vault/Audit';
import Create from './routes/vault/Create';
import Vault from './routes/vault/Vault';

function App() {

  const Titlebar = () => {
    if (!isElectron())
      return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        zIndex: 999,
        width: '100%',
      }}>
        <TitleBar
          title="Vault"
          disableMaximize={true}
          onClose={() => {
            sessionStorage.setItem('electron', 'close');
          }}
          onMinimize={() => {
            sessionStorage.setItem('electron', 'minimize');
            setTimeout(() => {
              sessionStorage.removeItem('electron');
            }, 1000);
          }}
          iconSrc="logo.png"
        />
      </div>
    )
  }

  return (<>
    {Titlebar()}
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
      </Routes>
    </Router>
  </>);
}

export default App;
