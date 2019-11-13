import React, { Component } from 'react';
import Deposits from './Deposits';

class Proposal extends Component {

  state = { deposits: [] };


  componentDidMount = async () => {

      console.log('Loading Deposit graph...');
      await this.graph();

  };

  async graph(){

    console.log('graph(): ' + this.props.proposal.name)
    // https://thegraph.com/docs/graphql-api
    const query = `{ anonymousDeposits (where: {PropName: "` + this.props.proposal.name + `"}) {
        id
        SenderAddr
        ContriValue
        PropName
      }
    }`;

    console.log('QUERY:')
    console.log(query)

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

    console.log('Result:');
    console.log(result);

    if(!result.data)
      return;

    var anonymousDeposits = result.data.anonymousDeposits;
    this.setState({
      deposits: anonymousDeposits
    });

    console.log('graph() OUT')
  }

  render() {
    /*
    newProposalIssueds(first: 5) {
      id
      issuer
      deadline
      name
      data
      optionBaddr
      optionAaddr
    }

    */
    return(
      <div>
        <h3>{this.props.proposal.name}</h3>
        <p>ID: {this.props.proposal.id}</p>
        <p>Issuer: {this.props.proposal.issuer}</p>
        <p>Deadline: {this.props.proposal.deadline}</p>
        <p>Name: {this.props.proposal.name}</p>
        <p>Data: {this.props.proposal.data}</p>
        <p>optionBaddr: {this.props.proposal.optionBaddr}</p>
        <p>optionAaddr: {this.props.proposal.optionAaddr}</p>
        <Deposits name={this.props.proposal.name} deposits={this.state.deposits} />
        <hr/>

      </div>
    )

  }
}

export default Proposal
