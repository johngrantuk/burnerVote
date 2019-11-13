import React, { Component } from 'react';

class Deposit extends Component {

  /*
  anonymousDeposits(first: 5) {
    id
    SenderAddr
    ContriValue
    PropName
  }
  */
  render() {
    return(
      <div>
        <p>ID: {this.props.deposit.id}</p>
        <p>ContriValue: {this.props.deposit.ContriValue}</p>
        <p>PropName: {this.props.deposit.PropName}</p>
        <hr/>
      </div>
    )

  }
}

export default Deposit
