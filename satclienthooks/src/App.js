import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Index from './Pages/Index';
import Search from './Pages/Search';
import Nav from './Components/Nav/Nav';
import AlertProvider from './providers/alertProvider';
import Alert from './Components/Alerts/Alerts';
import Add from './Pages/Add';
import Register from './Pages/Register';
import Detail from './Pages/Detail';
import AuthProvider from './providers/authProvider';
import { ThemeProvider } from 'styled-components';
import RootStyles from './Components/styles/RootStyles';

const theme = {
  primary: '#022E40',
  secondary: '#227373',
  tertiary: '#D9CDB8',
  accent: '#F27A5E',
  highlight: '#D93B3B',
};

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <RootStyles>
            <Alert />
            <Nav />
            <Switch>
              <Route exact path='/dashboard'>
                <Dashboard />
              </Route>
              <Redirect exact from='/dashboard/refresh' to='/dashboard' />
              <Route exact path='/'>
                <Index />
              </Route>
              <Route exact path='/search'>
                <Search />
              </Route>
              <Route exact path='/add'>
                <Add />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route path='/detail/:id' component={Detail} />
            </Switch>
          </RootStyles>
        </ThemeProvider>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
