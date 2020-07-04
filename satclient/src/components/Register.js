import React, { Component } from 'react';
import Axios from 'axios';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  saveUser() {
    const user = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    Axios.post('http://localhost:3000/register', user).then((res) => {
      this.setState({
        name: res.data.name,
        username: res.data.username,
        email: res.data.email,
        password: res.data.password,
      });
    });
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              required
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="text"
              required
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              required
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Optional"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.saveUser}>
            Register
          </Button>
        </Form>
      </Container>
    );
  }
}
