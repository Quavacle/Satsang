import React from 'react'
import { Card, Col, Row, Container, Image, Button, Table } from 'react-bootstrap'
import Axios from 'axios'

class BookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
    this.bookConcat = this.bookConcat.bind(this);
  }

  componentDidMount() {
    if (this.state.results.length === 0) {
      Axios.get('http://localhost:3000/books/browse').then((data) => {
        this.setState({
          results: this.bookConcat(data.data),
        })
        console.log(this.bookConcat(data.data))

      }
      )
    }
  }

  bookConcat(props) {
    // Function to take in book and owner information, reduce it to one object per title and attach all users/instances to that object
    const formatted = props.reduce((acc, curr) => {
      const found = acc.some(el => el.title === curr.book.title)
      if (!found) {
        // Title does not exist, create entry in our accumulator
        const entry = Object.assign({ id: curr._id, title: curr.book.title, book: curr.book, user: [curr.user] })
        acc.push(entry)
      } else {
        for (const i in acc) {
          // Book exists and does not need to be created, iterate and match titles, then add users to array of owners
          if (acc[i].title === curr.book.title) {
            acc[i].user.push(curr.user)
          }
        }
      }
      return acc
    }, []);
    return formatted
  }

  renderResults(props) {
    let available = 'None Available'
    console.log(props.user[0].username)
    if (props.borrowed_by === undefined) {
      available = `${props.user.length} copies available`
    }
    return (
      <tr>
        <td><Image src={props.book.cover} /></td>
        <td>{props.book.title}</td>
        <td>{props.book.authors.map((auth) => <li>{auth}</li>)}</td>
        <td>{available}</td>
        <td>{props.user.username}</td>
      </tr>

    )
  }

  render() {
    return (
      <div>
        <h1>Browse All Books</h1>
        <Table striped bordered hover variant="dark" >
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title </th>
              <th>Authors</th>
              <th>Available?</th>
              <th>Owners</th>
            </tr>
          </thead>
          <tbody>

            {(this.state.results.length > 0) ? this.state.results.map((key) => this.renderResults(key)) : null}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default BookContainer;