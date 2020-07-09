import React from 'react';
import './App.css';
import NavigationBar from './components/Navigation';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import AddBooks from './components/AddBooks';
import Dashboard from './components/Dashboard';
import InstanceDetail from './components/InstanceDetail'
import BrowseBooks from './components/BrowseBooks'
import BrowseUsers from './components/BrowseUsers'
import Axios from 'axios'
import { createStore } from 'redux'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      borrowed: null,
      owned: null,
      requested: null
    };
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    if (this.state.user === null) {
      const token = localStorage.getItem('token');
      if (token) {
        Axios.get('http://localhost:3000/dashboard', {
          headers: {
            authorization: token,
          },
        }).then((data) => {
          this.setState(
            {
              user: data.data.results.user.username,
              borrowed: data.data.results.borrowed,
              owned: data.data.results.owned,
              requested: data.data.results.requested
            });
          console.log(`App mount user: ${this.state.user}`)
        });
      }
    }
  }

  logOut() {
    window.localStorage.removeItem('token')
    this.setState({ user: null, borrowed: null, owned: null, requested: null });
  }

  render() {
    return (
      <div>
        <NavigationBar user={this.state.user} logOut={this.logOut} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              component={Login}
            />
            <Route path="/about" component={About} />
            <Route path="/register" render={() => <Register />} />
            <Route path="/AddBooks" render={() => <AddBooks />} />
            <Route path="/browse" render={() => <BrowseBooks />} />
            <Route path="/users" render={() => <BrowseUsers />} />
            <Route path="/instances/:instanceId" render={(props) => <InstanceDetail {...props} />} />
            <Route

              path="/dashboard/"
              render={() => (
                <Dashboard
                  user={this.state.user}
                  owned={this.state.owned}
                  borrowed={this.state.borrowed}
                  requested={this.state.requested}
                  logOut={this.logOut}
                />
              )}
            />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
