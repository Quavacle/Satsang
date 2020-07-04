import React from 'react';
import './App.css';
import NavigationBar from './components/Navigation';
import jwt from 'jwt-decode';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { verifyToken } from './components/Services';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import AddBooks from './components/AddBooks';
import Dashboard from './components/Dashboard';
import InstanceDetail from './components/InstanceDetail'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      user: null,
      loggedIn: null,
    };

    this.logOut = this.logOut.bind(this);
    this.validateToken = this.validateToken.bind(this);
  }

  componentDidMount() {
    this.validateToken();
  }

  async validateToken() {
    const isValid = await verifyToken();
    if (isValid.data === true) {
      const token = localStorage.getItem('token') || null;
      const decoded = jwt(token);
      const { username, _id } = decoded;
      this.setState({ _id: _id, user: username, loggedIn: true });
    }
  }

  logOut() {
    this.setState({ _id: null, user: null, loggedIn: true });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationBar user={this.state.user} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} validateToken={this.validateToken} />
              )}
            />
            <Route path="/about" component={About} />
            <Route path="/register" component={Register} />
            <Route path="/AddBooks" component={AddBooks} />
            <Route exact path="/instances/:instanceId" component={InstanceDetail} />
            <Route
              exact
              path="/dashboard/"
              render={(props) => (
                <Dashboard
                  {...props}
                  user={this.state.user}
                  logOut={this.logOut}
                />
              )}
            />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
