import React, { Component } from "react";
import Proposals from './components/Proposals';
import Deposits from './components/Deposits';
import NavBar from './components/NavBar';
import "./black-dashboard/assets/css/black-dashboard-react.css";
import "./black-dashboard/assets/css/nucleo-icons.css";



class App extends Component {

  state = { storageValue: 0, web3: null, accounts: null, contract: null, proposals: [], deposits: [] };

  componentDidMount = async () => {
    try {
      console.log('Loading graph...');
      await this.graph();
    } catch (error) {
      alert(
        'Error loading The Graph',
      );
      console.error(error);
    }
  };

  async graph(){

    // https://thegraph.com/docs/graphql-api
    // anonymousDeposits (where: {PropName: "qwwafae"}) {
    const query = `{
      anonymousDeposits {
        id
        SenderAddr
        ContriValue
        PropName
        Choice
      }
      newProposalIssueds(first: 5) {
        id
        issuer
        deadline
        name
        data
        optionBaddr
        optionAaddr
      }
    }`;

    const result = await fetch('https://api.thegraph.com/subgraphs/name/madhur4444/imgovdynamic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
    }).then(r => r.json()).then(data => data).catch(error => console.log(error))

    // console.log('Result:');
    // console.log(result);
    var anonymousDeposits = result.data.anonymousDeposits;
    var newProposalIssueds = result.data.newProposalIssueds;
    this.setState({
      proposals: newProposalIssueds,
      deposits: anonymousDeposits
    });

    console.log('graph() OUT')
  }

  render() {

    return (
      <div className="App">
        <div className="main-panel">
          <NavBar></NavBar>

          <div className="content">
            <div className="container-fluid">

              <Proposals proposals={this.state.proposals} />
              <Deposits name={"All"} deposits={this.state.deposits} />


            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
