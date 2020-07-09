import React from 'react';
import Axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
      users: [],
      message: null,
      token: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.request = this.request.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    this.setState({
      token: token
    })
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    console.log(value)
    this.setState({
      [name]: value,
    });
  }

  handleList(e) {
    alert(e.target.value)
  }

  listUsers(props) {
    return <option value={props.instance._id}>{props.user.username} </option>
  }

  request() {
    const token = localStorage.getItem('token');
    const headers = {
      "authorization": token
    }
    console.log(this.state.token)
    Axios.put('http://localhost:3000/instances/' + this.state.instance + '/request', {},
      { headers }
    ).then((res) => { alert('Book requested!') })
  }

  render() {
    console.log(`FORM PROPS`)
    console.log(this.props.props.props)
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
              {this.props.props.props.owner.map((u) => this.listUsers(u))}
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

