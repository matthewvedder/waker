import React, { Component, PropTypes } from 'react'
import axios from 'axios'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    this.login = this.login.bind(this)
  }
  login() {
    const { email, password } = this.state
    const request = {"auth": { email, password }}
      axios.post('http://localhost:8000/user_token', request)
    .then(function (response) {
      localStorage.setItem("jwt", response.data.jwt)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  render() {
      return (
        <div className="LoginForm">
          <h1 style={{marginTop: "20vh", marginBottom: "5vh"}}>
            Login
          </h1>
          <form>
            <label htmlFor="email">Email: </label>
            <br />
            <input
              name="email"
              id="email"
              type="email"
              onChange={e => this.setState({email: e.target.value})}
            />
            <br /><br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              name="password"
              id="password"
              type="password"
              onChange={e => this.setState({password: e.target.value})}
            />
            </form>
            <br />
            <button
              onClick={this.login}
            >
                Login
            </button>
          <br />
        </div>
      );
    }
}

export default LoginForm
