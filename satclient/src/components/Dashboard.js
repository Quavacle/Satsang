import React from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import jwt from 'jwt-decode'
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      borrowed: null,
      owned: null,
      requested: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const decoded = jwt(token)
    console.table(decoded)


    Axios.get('http://localhost:3000/dashboard', {
      headers: {
        authorization: token,
      },
    }).then((data) => {
      console.log(data.data)
      this.setState(
        {
          user: data.data.results.user.username,
          borrowed: data.data.results.borrowed,
          owned: data.data.results.owned,
          requested: data.data.results.requested
        });
    });
  }

  renderBooks(props) {
    return (
      <div>
        <li><Link to={`/instances/${props._id}`}>{props.book.title}  </Link></li>
        {(props.book.thumbnail) ? <img src={props.book.thumbnail} /> : null}
      </div>
    )
  }

  renderAuthors(props) {
    return (
      <li>{props}</li>
    )
  }


  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{this.state.user}</h1>
        <Row>
          <Col>
            <Card>
              <Card.Title>My books</Card.Title>
              <ul>{(this.state.owned) ? this.state.owned.map((key) => this.renderBooks(key)) : null}</ul>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title>Borrowed Books</Card.Title>
              <ul>{(this.state.borrowed) ? this.state.borrowed.map((key) => this.renderBooks(key)) : null}</ul>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Title>Lent Books</Card.Title>
              <ul>{(this.state.owned) ? this.state.owned.map((key) => this.renderBooks(key)) : null}</ul>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title>Requested Book</Card.Title>
              <ul>{(this.state.requested) ? this.state.requested.map((key) => this.renderBooks(key)) : null}</ul>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default Dashboard;
