import React from 'react';
import Axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
      users: [],
      message: null,
      show: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.request = this.request.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    console.log(value)
    this.setState({
      [name]: value,
      message: null,
    });
  }

  listUsers(props) {
    return <option value={props.instance._id}>{props.user.username} </option>
  }

  request() {
    const token = localStorage.getItem('token');
    const headers = {
      "authorization": token
    }
    Axios.put('http://localhost:3000/instances/' + this.state.instance + '/request', {},
      { headers }
    ).then((res) => {
      console.log(res)
      return (
        this.setState({ show: true })
      )
    })
  }


  render(props) {
    return (
      <div className="form-container">
        <Form>
          <Form.Group controlId="instance">
            <Form.Label>Request from: </Form.Label>
            <Form.Control
              as="select"
              name="instance"
              value={this.state.value}
              onChange={this.handleChange}>
              <option>Please select User</option>
              {this.props.owner.map((u) => this.listUsers(u))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Label>Send a Message</Form.Label>
            <Form.Control
              name="message"
              as="textarea" rows="5" value={this.state.value}
              onChange={this.handleChange} />
          </Form.Group>
          {this.state.instance ? <Button onClick={this.request} size="lg" >Send request!</Button> :
            <Button disabled size="lg">Send request!</Button>}
        </Form>
      </div>
    )
  }
}

