import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainNav from './components/navBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      user: null,
      loggedIn: null,
    };

    this.logOut = this.logOut.bind(this)
    this.validateToken = this.validateToken.bind(this)
  }

  componentDidMount();
}

export default App;
