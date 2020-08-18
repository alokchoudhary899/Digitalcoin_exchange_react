import Status from './components/status'
import Send from './components/send'
import Transactions from './components/transactions'
import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';
import decodeJwt from 'jwt-decode';
import Card from "react-bootstrap/Card";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: !!localStorage.getItem('token'),
      username: '',
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
        fetch('http://localhost:8000/auth/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        let decodedToken = decodeJwt(json.token);
        localStorage.setItem('user_id', decodedToken.user_id);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username,
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        const decodedToken = decodeJwt(json.token);
        localStorage.setItem('user_id', decodedToken.user_id);

        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
        <div className="App">
            <Card style={{ width: '18rem', height: '10rem'}}>
                  <Card.Body>
                    <Card.Title>NonceBlox Dashboard</Card.Title>
                  </Card.Body>
                    <Card.Body>
                       <Nav
                              logged_in={this.state.logged_in}
                              display_form={this.display_form}
                              handle_logout={this.handle_logout}
                            />
                    </Card.Body>
            </Card>
            {form}
            <h3>
                {this.state.logged_in
                    ?
                <div>
                    Hello, {this.state.username}
                  <Status/>
                  <Send/>
                  <Transactions/>
                </div>
                    : ''}
            </h3>
        </div>
        );
    }
}

export default App;