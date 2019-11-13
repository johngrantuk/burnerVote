import React, { Component } from 'react';

class Proposal extends Component {

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
        <p>ID: {this.props.proposal.id}</p>
        <p>Issuer: {this.props.proposal.issuer}</p>
        <p>Deadline: {this.props.proposal.deadline}</p>
        <p>Name: {this.props.proposal.name}</p>
        <p>Data: {this.props.proposal.data}</p>
        <p>optionBaddr: {this.props.proposal.optionBaddr}</p>
        <p>optionAaddr: {this.props.proposal.optionAaddr}</p>
        <hr/>
      </div>
    )

  }
}

export default Proposal
