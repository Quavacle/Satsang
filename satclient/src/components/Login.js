import React, { Component } from 'react';
import { Form, Col, Row, Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', token: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleLogin(props) {
    Axios.post('http://localhost:3000/login', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      this.props.validateToken();
      this.props.history.push('/dashboard');
    });
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="email">
            <Form.Label> E-mail </Form.Label>
            <Form.Control
              name="email"
              type="email"
              required
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="text"
              required
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        <Row className="mx-auto">
          <Col sm={6}>
            <Button
              variant="outline-info"
              type="submit"
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </Col>
          <Col sm={6}>
            <Link to="/register">
              <Button variant="outline-info">Register</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
