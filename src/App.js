import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import Proposals from './components/Proposals';
import Deposits from './components/Deposits';

// import "./App.css";
import "./black-dashboard/assets/css/black-dashboard-react.css";
import "./black-dashboard/assets/css/nucleo-icons.css";
import AdminNavbar from "./black-dashboard/components/Navbars/AdminNavbar.jsx";
import { Container, Alert } from "reactstrap";

var k
var a
var red
var blue
var name
var opA
var opB
var providerone
var web3
var defaultAccount
var proposalissued
var deadline
var moneymap = new Map();
var dataextra

class App extends Component {

  state = { storageValue: 0, web3: null, accounts: null, contract: null, proposals: [], deposits: [] };

  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    try {
      console.log('DidMount...');

      console.log('Loading graph...');
      await this.graph();
      /*
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      */

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
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

    const results = {}

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

    if(this.state.contractError){
      // return <Alert color="danger">No Contract Deployed On Your Current Network - Try Rinkeby?</Alert>;
    }

    if (!this.state.web3) {
      // return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <div className="main-panel">
          <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div className="container-fluid">
              <div className="navbar-wrapper">

                <a className="navbar-brand" href="#pablo">Dashboard</a>
              </div>

              <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
              </button>

              <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#pablo">
                      <i className="tim-icons icon-bell-55"></i>  Notifications
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

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
