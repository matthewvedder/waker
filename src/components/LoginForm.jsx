import React, { Component } from 'react'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    this.login = this.login.bind(this)
  }
  login() {
    console.log(this.state)
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
