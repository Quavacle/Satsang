import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const APIkey = 'AIzaSyDLAPl6MAlcljl1s7SgzE7-PuYVY1UlA1w';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: '',
      results: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.mapResults = this.mapResults.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  search() {
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          this.state.searchTitle +
          '&key=' +
          APIkey
      )
      // .then((res) => console.log(res.data.items[2].volumeInfo))
      .then((res) => this.mapResults(res.data.items))
      .catch((error) => console.log(JSON.stringify(error)));
  }

  mapResults(props) {
    let results = props.map((key) => key.volumeInfo);
    this.setState({ books: results });
  }

  renderResults(props) {
    return (
      <Card bg="dark" text="light">
        <Card.Body>
          <Row className="justify-content-md-center align-items-center">
            <Col md="6">
              <Card.Img
                variant="top"
                className="search thumbnail  mx-auto d-block"
                src={props.imageLinks.smallThumbnail}
                fluid
              />
            </Col>
            <Col className="justify-content-md-center" md="6">
              <Card.Title>{props.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {props.authors ? props.authors[0] : null}
              </Card.Subtitle>
              <i>Published: </i>
              {props.publishedDate} <br />
              {props.description}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <div className="form-container">
        <Card bg="dark" text="light">
          <Card.Title>Search</Card.Title>
          <Form>
            <Form.Row className="align-items-center">
              <Col>
                <Form.Group>
                  <Form.Control
                    name="searchTitle"
                    type="search"
                    value={this.state.value}
                    onChange={this.handleChange}
                    className="align-middle"
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button
                  variant="primary"
                  className="mb-3"
                  id="submit-button"
                  onClick={this.search}
                >
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Card>
        <Card variant="dark">
          <Card.Title>Search Results</Card.Title>

          {this.state.books
            ? this.state.books.map((key) => this.renderResults(key))
            : null}
        </Card>
      </div>
    );
  }
}
