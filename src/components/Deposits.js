import React, { Component } from 'react';
import Deposit from './Deposit';

class Deposits extends Component {

  render() {

    const deposits = this.props.deposits.map(deposit => {
      return <Deposit key={deposit.id} deposit={deposit}/>
    })

    return (
      <div>
        <h2>Deposits</h2>
        {deposits}

      </div>
    )
  }
}

export default Deposits
