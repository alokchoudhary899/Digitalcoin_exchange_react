import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


const endpoint = 'http://127.0.0.1:8000/coin-exchange/check_balance/';
class Status extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_balance: '',
    }
  }

  componentDidMount() {
        const token = localStorage.getItem('token');
        axios.get(endpoint, { headers: {"Authorization" : `JWT ${token}`} })
          .then(res => {
            const current_balance = res.data.balance;
            this.setState({current_balance});
            })
        }

  render(){
        return (
                <Container>
                    <Row>
                        <Col sm="1">
                            <h5> <div><i className="fa fa-cubes"></i></div> Current Balance </h5> <hr/>
                            <h5 style={{color: '#007bff'}}>#<b>{this.state.current_balance} </b></h5>
                        </Col>
                    </Row>
                </Container>
                );
        }
}

export default Status;
