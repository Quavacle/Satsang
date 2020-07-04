import React from 'react'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './instance.css'
class InstanceDetail extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      title: null,
      authors: null,
      user: null,
      borrowed_by: null,
      requested_by: null,
      return_date: null,
      returned: null,
      cover: null
    }

  }

  componentDidMount() {
    const instanceId = this.props.match.params.instanceId;
    console.log(instanceId)
    Axios.get(`http://localhost:3000/instances/${instanceId}`).then((res) => {
      console.log(res)
      const { title, authors, cover } = res.data.book
      console.log(authors)
      const { user, borrowed_by, requested_by, return_date, returned } = res.data;


      this.setState({
        title: title,
        authors: authors,
        user: user.username,
        borrowed_by: borrowed_by,
        requested_by: requested_by,
        return_date: return_date,
        returned: returned,
        cover: cover
      })
    })
  }


  render() {
    console.log(this.state.authors)
    return (
      <Container>
        <Card>
          <Card.Title>
            <span class="username">{this.state.user}'s</span> <i>copy of</i> <h1>{this.state.title}</h1>
            <i>by</i> {this.state.authors ? this.state.authors.map((author) => <span class="author">{author}  </span>) : null}
          </Card.Title>
          <Row>
            <Col>
              <ul>
                <li>{this.state.title}</li>
              </ul>
            </Col>
          </Row>
        </Card>
      </Container>
    )
  }
}

export default InstanceDetail;