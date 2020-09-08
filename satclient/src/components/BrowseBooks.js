import React from 'react'
import { Card, Col, Row, Container, Image, Button, Table, Modal } from 'react-bootstrap'
import Axios from 'axios'
import RequestModal from './RequestModal'

class BookContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      showModal: false,
      showAlert: false,
    }
    this.bookConcat = this.bookConcat.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }


  componentDidMount() {
    const token = localStorage.getItem('token')
    if (this.state.results.length === 0) {
      const headers = {
        "authorization": token
      }
      Axios.get('http://localhost:3000/books/browse', { headers }).then((data) => {
        this.setState({
          results: this.bookConcat(data.data),
        })
        console.log(this.bookConcat(data.data))

      }
      )
    }
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  showAlert = () => {
    this.setState({ showAlert: true })
  }

  bookConcat(props) {
    // Function to take in book and owner information, reduce it to one object per title and attach all users/instances to that object
    const formatted = props.reduce((acc, curr) => {

      const found = acc.some(el => el.title === curr.book.title)
      if (!found) {
        // Title does not exist, create entry in our accumulator
        const entry = Object.assign({ title: curr.book.title, book: curr.book, owner: [{ user: curr.user, instance: curr }] })
        acc.push(entry)
      } else {
        for (const i in acc) {
          // Book exists and does not need to be created, iterate and match titles, then add users to array of owners
          if (acc[i].title === curr.book.title) {
            acc[i].owner.push({ user: curr.user, instance: curr })
          }
        }
      }
      return acc
    }, []);
    return formatted
  }

  renderResults(props) {
    let available = 'None Available'
    if (props.borrowed_by === undefined) {
      available = `${props.owner.length} copies available`
    }
    return (

      <Col>
        <Card variant="dark" text="light" bg="dark">
          <Card.Title>{props.book.title}</Card.Title>
          <Card.Subtitle>{available}
            {props.book.authors.map((auth) => <li>{auth}</li>)}
          </Card.Subtitle>
          <Image src={props.book.cover} rounded />
          <Card.Body>
            {props.book.description}
            <RequestModal {...props} />
          </Card.Body>
        </Card>
      </Col>
    )
  }

  render(props) {
    return (
      <div>
        <Container bg="dark ">
          <h1>Browse All Books</h1>
          <Row>
            {(this.state.results.length > 0) ? this.state.results.map((key) => this.renderResults(key)) : null}
          </Row>
        </Container>
      </div>
    )
  }
}

export default BookContainer;