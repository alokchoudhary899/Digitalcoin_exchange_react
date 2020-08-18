import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';


const endpoint = 'http://127.0.0.1:8000/coin-exchange/get_transaction/';
class Transactions extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactions: [],
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    axios.get(endpoint, { headers: {"Authorization" : `JWT ${token}`} })
      .then(res => {
        const transactions = res.data;
        this.setState({ transactions });
      })
  }
  render(){
    return (
            <Container>
              <br/>
              <h3><b> Transactions </b></h3>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Recipient</th>
                        <th>Total Digital Coin</th>
                        <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.transactions.map(t =>
                        <tr key={t.id}>
                          <td><b style={{color: '#007bff'}}>{t.receiver_name}</b></td>
                          <td><b style={{color: '#007bff'}}>{parseFloat(t.amount).toFixed(5)} </b></td>
                          <td><b style={{color: '#007bff'}}>{t.time}</b></td>
                        </tr>
                      )}
                  </tbody>
                </Table>
            </Container>
            );
          }
  }

export default Transactions;