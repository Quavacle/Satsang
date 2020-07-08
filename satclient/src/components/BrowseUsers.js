import React from 'react'
import Axios from 'axios'


class UserContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  render() {
    return (
      <h1>User index</h1>
    )
  }
}

export default UserContainer