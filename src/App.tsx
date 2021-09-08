import TitleBar from 'frameless-titlebar';
import isElectron from 'is-electron';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Validate from './components/Validate';
import Home from './routes/home/Home';
import Login from './routes/login/Login';
import Token from './routes/login/Token';
import Logout from './routes/logout/Logout';
import Archive from './routes/vault/Archive';
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
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/login/token" exact component={Token} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/vault" exact component={Vault} />
        <Route path="/vault/create" exact component={Create} />
        <Route path="/vault/archive" exact component={Archive} />
      </Switch>
      <Validate
        fallback="/login"
        localStore="state"
      />
    </Router>
  </>);
}

export default App;
